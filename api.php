<?php

include "config/database.php";

$dataPage = isset($_GET['data']) ? $_GET['data'] : null;

if ($dataPage == 'dashboard-manager') {
    include "datas/dashboard-manager.php";
}

?>