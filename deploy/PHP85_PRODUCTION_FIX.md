# PPIS production fix for PHP 8.5

Apply this after the server is on a PHP version that includes the PHP2Shell security fix.

Use one of these versions (or a newer release in the same line):

- PHP 8.5.12
- PHP 8.4.27
- PHP 8.3.36
- PHP 8.2.35

PPIS uses CodeIgniter 3.1.13. That framework still runs on these versions, but PHP 8.2 and newer prints warnings on every page. The warnings show up as “A PHP Error was encountered” above the normal screen. The pages, buttons, and workflow stay the same. These edits only stop the warnings.

Back up the six files below before editing. After editing, restart PHP (Apache, IIS, or PHP-FPM) so the server does not keep the old files in cache.

## 1. Allow CodeIgniter to keep its existing properties

Add this line directly above the `class` line in each file. Do not change anything else in the file.

```php
#[\AllowDynamicProperties]
```

| File | Class line to mark |
| --- | --- |
| `system/core/Controller.php` | `class CI_Controller {` |
| `system/core/Loader.php` | `class CI_Loader {` |
| `system/core/URI.php` | `class CI_URI {` |
| `system/core/Router.php` | `class CI_Router {` |

Example (`system/core/Controller.php`):

```php
#[\AllowDynamicProperties]
class CI_Controller {
```

Repeat that same one-line addition for the other three classes.

## 2. Stop using the removed E_STRICT constant

PHP 8.4 removed this constant. CodeIgniter still names it, so every page prints `Constant E_STRICT is deprecated`.

### `system/core/Exceptions.php`

Find this list and delete only the `E_STRICT` line:

```php
		E_USER_NOTICE		=>	'User Notice',
		E_STRICT		=>	'Runtime Notice'
```

Leave it as:

```php
		E_USER_NOTICE		=>	'User Notice'
```

### `index.php`

In the `production` / `testing` section, find:

```php
error_reporting(E_ALL & ~E_NOTICE & ~E_DEPRECATED & ~E_STRICT & ~E_USER_NOTICE & ~E_USER_DEPRECATED);
```

Replace it with:

```php
error_reporting(E_ALL & ~E_NOTICE & ~E_DEPRECATED & ~E_USER_NOTICE & ~E_USER_DEPRECATED);
```

In the old PHP 5 branch just below it, find:

```php
error_reporting(E_ALL & ~E_NOTICE & ~E_STRICT & ~E_USER_NOTICE);
```

Replace it with:

```php
error_reporting(E_ALL & ~E_NOTICE & ~E_USER_NOTICE);
```

Do not change comments in other files that only mention the words `E_STRICT`.

## 3. Check the site

Open these pages in a browser:

- Login
- Dashboard
- One worksheet screen
- One docketing screen

Each page should load as it did before, with no red “A PHP Error was encountered” box and no “E_STRICT” message at the top.

Also run `php -v` on the server and confirm the version is one of the patched versions listed at the top.
