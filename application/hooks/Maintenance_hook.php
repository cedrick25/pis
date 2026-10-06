<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Maintenance_hook {

	public function check()
	{
		if (is_cli())
		{
			return;
		}

		$file = APPPATH.'config/maintenance.php';
		if ( ! is_file($file))
		{
			return;
		}

		$config = array();
		include $file;

		if (empty($config['maintenance_mode']))
		{
			return;
		}

		if ($this->is_sign_in_request() || $this->is_administrator($config))
		{
			return;
		}

		$title = ! empty($config['maintenance_title'])
			? $config['maintenance_title']
			: 'System Maintenance';
		$message = ! empty($config['maintenance_message'])
			? $config['maintenance_message']
			: 'The system is temporarily unavailable while updates are being applied. Please try again later.';

		$script = isset($_SERVER['SCRIPT_NAME']) ? (string) $_SERVER['SCRIPT_NAME'] : 'index.php';
		$sign_in_url = rtrim($script, '/').'/administrator-sign-in';
		$show_sign_in = TRUE;

		http_response_code(503);
		header('Retry-After: 3600');
		header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');
		header('Pragma: no-cache');
		header('Content-Type: text/html; charset=UTF-8');

		include APPPATH.'views/maintenance.php';
		exit;
	}

	private function is_sign_in_request()
	{
		return $this->request_path() === 'administrator-sign-in';
	}

	private function request_path()
	{
		$uri = isset($_SERVER['REQUEST_URI']) ? (string) $_SERVER['REQUEST_URI'] : '';
		$path = parse_url($uri, PHP_URL_PATH);
		if ( ! is_string($path))
		{
			$path = '';
		}

		$path = str_replace('\\', '/', $path);
		$script = isset($_SERVER['SCRIPT_NAME']) ? str_replace('\\', '/', (string) $_SERVER['SCRIPT_NAME']) : '';

		if ($script !== '' && strpos($path, $script) === 0)
		{
			$path = substr($path, strlen($script));
		}
		else
		{
			$dir = rtrim(str_replace('\\', '/', dirname($script)), '/');
			if ($dir !== '' && $dir !== '/' && strpos($path, $dir) === 0)
			{
				$path = substr($path, strlen($dir));
			}
		}

		$path = trim($path, '/');
		if (stripos($path, 'index.php/') === 0)
		{
			$path = substr($path, strlen('index.php/'));
		}
		elseif (strcasecmp($path, 'index.php') === 0)
		{
			$path = '';
		}

		return strtolower($path);
	}

	private function is_administrator($config)
	{
		$uuid = isset($_COOKIE['uuid']) ? trim((string) $_COOKIE['uuid']) : '';
		if ( ! preg_match('/^[A-Za-z0-9-]{8,64}$/', $uuid))
		{
			return FALSE;
		}

		$allowed = array('admin');
		if ( ! empty($config['maintenance_admin_usernames']) && is_array($config['maintenance_admin_usernames']))
		{
			$allowed = array();
			foreach ($config['maintenance_admin_usernames'] as $name)
			{
				$name = strtolower(trim((string) $name));
				if ($name !== '')
				{
					$allowed[] = $name;
				}
			}
		}

		if (empty($allowed))
		{
			return FALSE;
		}

		$db = $this->user_database();
		$mysqli = @new mysqli($db['host'], $db['user'], $db['pass'], $db['name'], (int) $db['port']);
		if ($mysqli->connect_errno)
		{
			return FALSE;
		}

		$mysqli->set_charset('utf8');
		$sql = 'SELECT name FROM user WHERE uuid = ? AND account_status = ? AND status = 1 LIMIT 1';
		$stmt = $mysqli->prepare($sql);
		if ( ! $stmt)
		{
			$mysqli->close();
			return FALSE;
		}

		$active = 'ACTIVE';
		$stmt->bind_param('ss', $uuid, $active);
		$stmt->execute();
		$stmt->bind_result($username);
		$found = $stmt->fetch();
		$stmt->close();
		$mysqli->close();

		if ( ! $found)
		{
			return FALSE;
		}

		return in_array(strtolower(trim((string) $username)), $allowed, TRUE);
	}

	private function user_database()
	{
		$db = array(
			'host' => 'localhost',
			'port' => 3306,
			'name' => 'assetms',
			'user' => 'assetms',
			'pass' => '',
		);

		$file = dirname(FCPATH).DIRECTORY_SEPARATOR.'backend-user-feature-management'.DIRECTORY_SEPARATOR.'src'.DIRECTORY_SEPARATOR.'main'.DIRECTORY_SEPARATOR.'resources'.DIRECTORY_SEPARATOR.'application.properties';
		if ( ! is_file($file))
		{
			return $db;
		}

		$lines = file($file, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
		if ($lines === FALSE)
		{
			return $db;
		}

		foreach ($lines as $line)
		{
			$line = trim($line);
			if ($line === '' || $line[0] === '#')
			{
				continue;
			}

			if (strpos($line, 'spring.datasource.url=') === 0)
			{
				$url = substr($line, strlen('spring.datasource.url='));
				if (preg_match('#jdbc:mysql://([^/:]+)(?::(\d+))?/([^?]+)#', $url, $match))
				{
					$db['host'] = $match[1];
					if ($match[2] !== '')
					{
						$db['port'] = (int) $match[2];
					}
					$db['name'] = $match[3];
				}
			}
			elseif (strpos($line, 'spring.datasource.username=') === 0)
			{
				$db['user'] = substr($line, strlen('spring.datasource.username='));
			}
			elseif (strpos($line, 'spring.datasource.password=') === 0)
			{
				$db['pass'] = substr($line, strlen('spring.datasource.password='));
			}
		}

		return $db;
	}
}
