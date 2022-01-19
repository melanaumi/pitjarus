<?php
class ModelPitjarus extends CI_Model  {
    function getStoreArea(){
        $query=$this->db->query("SELECT * FROM store_area");
        return $query;
    }

    function getReport(){
        $query=$this->db->query("SELECT * FROM report_product");
        return $query;
    }

    function getReportFiltered($postdata = []) {
        $where_area = "";
        if (isset($postdata['area_id']) && is_array($postdata['area_id']) && count($postdata['area_id']) > 0) {
            $where_area = "WHERE area_id IN (" . implode(",", $postdata['area_id']) . ")";
        } 

        $areas = $this->db->query("SELECT * FROM store_area $where_area")->result();
        $header = ""; $i = 1;
        foreach ($areas as $a) {
            $header .= "MAX(CASE WHEN main.area_id = " . $a->area_id ." THEN main.compliance END) compliance_area_" . $a->area_id;
            if ($i < count($areas)) $header .= ", ";
            $i++;
        }
        
        if (!isset($postdata['start_date']) || $postdata['start_date'] == '') $postdata['start_date'] = '1970-01-01';
        if (!isset($postdata['end_date']) || $postdata['end_date'] == '') $postdata['end_date'] = date('Y-m-d');
        $where_date = "WHERE rp.tanggal BETWEEN '" . $postdata['start_date'] . "' AND '" . $postdata['end_date'] . "'";
        $query = "SELECT pb.brand_id, pb.brand_name, $header 
        FROM product_brand AS pb
        LEFT JOIN (SELECT pb.brand_id, sa.area_id, pb.brand_name, sa.area_name, SUM(rp.compliance) AS compliance
        FROM report_product AS rp
        INNER JOIN product AS p ON rp.product_id = p.product_id
        INNER JOIN product_brand AS pb on p.brand_id = pb.brand_id
        INNER JOIN store AS s ON rp.store_id = s.store_id
        INNER JOIN (SELECT * FROM store_area $where_area) AS sa ON s.area_id = sa.area_id
        $where_date
        GROUP BY pb.brand_id, sa.area_id) AS main ON pb.brand_id = main.brand_id
        GROUP BY pb.brand_id";

        $query1 = "SELECT $header 
        FROM (SELECT sa.area_id, sa.area_name, SUM(rp.compliance) AS compliance
        FROM report_product AS rp
        INNER JOIN product AS p ON rp.product_id = p.product_id
        INNER JOIN product_brand AS pb on p.brand_id = pb.brand_id
        INNER JOIN store AS s ON rp.store_id = s.store_id
        INNER JOIN (SELECT * FROM store_area $where_area) AS sa ON s.area_id = sa.area_id
        $where_date
        GROUP BY sa.area_id) AS main";

        $num_rows = $this->getReport()->num_rows();
        $data = $this->db->query($query)->result();
        $chart = $this->db->query($query1)->result();

        foreach ($data as $d) {
            foreach ($areas as $a) {
                $header = "compliance_area_" . $a->area_id;
                $d->$header = round($d->$header / $num_rows * 100, 2);
            }
        }

        foreach ($chart as $d) {
            foreach ($areas as $a) {
                $header = "compliance_area_" . $a->area_id;
                $d->$header = round($d->$header / $num_rows * 100, 2);
            }
        }

        return [
            'area' => $areas,
            'data' => $data,
            'charts' => $chart,
            'query' => $query
        ];
    }

}