<?php

class Controller {

	public static function getData() {
		$data = Functions::getGHData();
		if (!isset($data)) {
			$data = [
				'tasks' => [],
				'projects' => [],
			];
		}
		return ['data' => $data,];
	}


	public static function setData() {
		$post = file_get_contents('php://input');
		$data = json_decode($post, true);
		if ($data) {
			Functions::setGHData($data);
		}
	}
}


class Functions {

	public static function setGHData($data) {
		global $CONFIG;
		$gistUrl = "https://api.github.com/gists/{$CONFIG['gistId']}";
		$fileName = 'ght.json';
		$content = json_encode($data);
		$data = [
			"description" => "GHT",
			"files" => [
				$fileName => [
					"content" => $content,
				],
			],
		];

		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL, $gistUrl);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true );
		curl_setopt($ch, CURLOPT_USERPWD, "{$CONFIG['user']}:{$CONFIG['token']}");
		curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "PATCH");
		curl_setopt($ch, CURLOPT_USERAGENT, 'GHT');
		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
		curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
		$response = curl_exec($ch);
		return $response;
	}


	public static function getGHData() {
		global $CONFIG;
		$gistUrl = "https://api.github.com/gists/{$CONFIG['gistId']}";
		$fileName = 'ght.json';
		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL, $gistUrl);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($ch, CURLOPT_USERAGENT, 'GHT');
		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
		$response = curl_exec($ch);
		$gistData = json_decode($response, true);
		$data = [
			'tasks' => [],
			'projects' => [],
		];
		if ($gistData['files'][$fileName]['content']) {
			$gistContent = json_decode($gistData['files'][$fileName]['content'], true);
			if ($gistContent) {
				if (isset($gistContent['tasks'])) {
					$data['tasks'] = $gistContent['tasks'];
				}
				if (isset($gistContent['projects']))	{
					$data['projects'] = $gistContent['projects'];
				}
			}
		}
		return $data;
	}


	public static function cleanWarnings($str) {
		$toRemove = array('<b>', '</b>', '<br />');
		$str = str_replace($toRemove, '', $str);
		$str = trim($str);
		$str = str_replace("\n\n", "\n", $str);
		return $str;
	}
}


global $CONFIG;
$CONFIG = json_decode(file_get_contents('config.json'), true);

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
else {
	require 'view.html';
}