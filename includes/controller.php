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
