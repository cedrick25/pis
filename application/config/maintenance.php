<?php
defined('BASEPATH') OR exit('No direct script access allowed');

/*
|--------------------------------------------------------------------------
| Maintenance mode
|--------------------------------------------------------------------------
|
| TRUE  = visitors see the maintenance page.
| FALSE = the system works normally.
|
| While this is TRUE, only the administrator account can use the system.
| That account signs in from the link on the maintenance page.
|
*/
$config['maintenance_mode'] = FALSE;

$config['maintenance_admin_usernames'] = array('admin');

$config['maintenance_title'] = 'System Maintenance';

$config['maintenance_message'] = 'The Probation and Parole Information System is temporarily unavailable while updates are being applied. Please try again later.';
