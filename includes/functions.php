<?php

class Functions {

	/**
	* Verifie si l'utilisateur est bien connecte
	*/
	public static function isLoggedIn() {
		return true;
		// return isset($_SESSION['auth']);
	}


	public static function truncateUrl($url) {
		$urlArray = explode('/', $url);
		array_pop($urlArray);
		array_pop($urlArray);
		return implode('/', $urlArray);
	}


	public static function cleanWarnings($str) {
		$toRemove = array('<b>', '</b>', '<br />');
		$str = str_replace($toRemove, '', $str);
		$str = trim($str);
		$str = str_replace("\n\n", "\n", $str);
		return $str;
	}


	public static function removeLineBreaks($str) {
		$str = str_replace("\n", ' ', $str);
		$str = str_replace("\r", ' ', $str);
		$str = str_replace("  ", ' ', $str);
		return $str;
	}


	public static function cleanSpecialChars($str) {
		$str = str_replace('’', '\'', $str);
		$str = str_replace('`', '\'', $str);
		$str = str_replace('œ', 'oe', $str);
		$str = str_replace('…', '...', $str);
		return $str;
	}


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
		curl_setopt($ch, CURLOPT_USERPWD, "{$CONFIG['user']}:{$CONFIG['token']}");
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
}
