<?php
require 'includes/functions.php';
require 'includes/controller.php';

global $CONFIG;
$CONFIG = json_decode(file_get_contents('includes/config.json'), true);

// Cas d'une action en ajax
if (isset($_REQUEST['action'])) {
	// header('Content-Type: text/json; charset=utf-8');

	ob_start();

	if (isset($_REQUEST['action'])) {
		try {
			if (method_exists('Controller', $_REQUEST['action'])) {
				$return = call_user_func('Controller::'.$_REQUEST['action']);
			}
			else {
				$return['error'] = 'Action inconnue : '.$_REQUEST['action'];
			}
		}
		catch(Exception $e) {
			$return['error'] = $e->getMessage();
		}
	}
	else {
		$return['error'] = 'Aucune action';
	}
	$return['logged_in'] = Functions::isLoggedIn();

	if (!$return) {
		$return['error'] = 'Echec';
	}


	$warn = ob_get_contents();
	if (strlen($warn) > 0) {
		$return['warning'] = Functions::cleanWarnings($warn);
	}
	ob_end_clean();

	echo json_encode($return);
}
// index
else {
	// Functions::checkApp();
	// require './includes/view.php';
}
