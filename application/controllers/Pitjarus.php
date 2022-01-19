<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Pitjarus extends CI_Controller {
	function __construct(){
		parent::__construct();
		$this->load->model('ModelPitjarus');
	}

	public function index()
	{
		$getarea=$this->ModelPitjarus->getStoreArea()->result();
		$getreport=$this->ModelPitjarus->getReport()->result();

		$datefrom = $this->input->get('datefrom') ?: '';
		$dateto = $this->input->get('dateto') ?: '';

		$data=array(
			'datefrom'=>$datefrom,
			'dateto'=>$dateto,
			'getarea'=>$getarea,
			'getreport'=>$getreport,
		);

        $this->load->view('pitjarus', $data);
	}

	public function get_report(){
		$postdata = $this->input->post();
		echo json_encode($this->ModelPitjarus->getReportFiltered($postdata));
	}
}
