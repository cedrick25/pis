<?php
defined('BASEPATH') OR exit('No direct script access allowed');

$title = isset($title) ? $title : 'System Maintenance';
$message = isset($message) ? $message : 'The system is temporarily unavailable while updates are being applied. Please try again later.';
$show_sign_in = ! empty($show_sign_in);
$sign_in_url = isset($sign_in_url) ? $sign_in_url : '';
?>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta name="robots" content="noindex, nofollow">
	<title><?php echo htmlspecialchars($title, ENT_QUOTES, 'UTF-8'); ?> | PPIS</title>
	<style>
		* { box-sizing: border-box; }
		html, body {
			margin: 0;
			min-height: 100%;
		}
		body {
			font-family: "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
			background: #272c33;
			color: #343a40;
			display: flex;
			align-items: center;
			justify-content: center;
			padding: 24px 16px;
		}
		.card {
			width: 100%;
			max-width: 520px;
			background: #fff;
			border-radius: 4px;
			padding: 40px 36px 32px;
			text-align: center;
			box-shadow: 0 12px 40px rgba(0, 0, 0, 0.28);
		}
		.brand {
			color: #272c33;
			font-size: 42px;
			font-weight: 700;
			letter-spacing: 1px;
			line-height: 1;
			margin: 0;
		}
		.brand-sub {
			display: block;
			margin-top: 8px;
			margin-bottom: 28px;
			color: #6c757d;
			font-size: 14px;
		}
		.icon {
			width: 64px;
			height: 64px;
			margin: 0 auto 18px;
			border-radius: 50%;
			background: #f4f6f8;
			display: flex;
			align-items: center;
			justify-content: center;
		}
		.icon svg {
			width: 32px;
			height: 32px;
			fill: #28a745;
		}
		h1 {
			margin: 0 0 12px;
			font-size: 22px;
			font-weight: 600;
			color: #212529;
		}
		p {
			margin: 0;
			color: #495057;
			font-size: 15px;
			line-height: 1.6;
		}
		.sign-in {
			display: inline-block;
			margin-top: 22px;
			color: #1e7e34;
			font-size: 14px;
			font-weight: 600;
			text-decoration: none;
		}
		.sign-in:hover {
			text-decoration: underline;
		}
	</style>
</head>
<body>
	<div class="card">
		<p class="brand">PPIS</p>
		<span class="brand-sub">Probation and Parole Information System</span>
		<div class="icon" aria-hidden="true">
			<svg viewBox="0 0 24 24" focusable="false">
				<path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z"/>
			</svg>
		</div>
		<h1><?php echo htmlspecialchars($title, ENT_QUOTES, 'UTF-8'); ?></h1>
		<p><?php echo htmlspecialchars($message, ENT_QUOTES, 'UTF-8'); ?></p>
		<?php if ($show_sign_in && $sign_in_url !== '') { ?>
			<a class="sign-in" href="<?php echo htmlspecialchars($sign_in_url, ENT_QUOTES, 'UTF-8'); ?>">Administrator sign in</a>
		<?php } ?>
	</div>
</body>
</html>
