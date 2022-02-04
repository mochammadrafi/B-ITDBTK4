<?php

$sql = mysqli_query($connection, "SELECT
	barang.nama_barang,
	ROUND(STDDEV(pemesanan.jumlah_pesanan), 3) AS s_order,
	ROUND(AVG(pemesanan.jumlah_pesanan), 3) AS mean_order,
	ROUND(STDDEV(produksi.jumlah_produksi), 3) AS s_demand,
	ROUND(AVG(produksi.jumlah_produksi), 3) AS mean_demand,
	ROUND((STDDEV(pemesanan.jumlah_pesanan) / AVG(pemesanan.jumlah_pesanan)), 3) AS cv_order,
	ROUND((STDDEV(produksi.jumlah_produksi) / AVG(produksi.jumlah_produksi)), 3) AS cv_demand,
	ROUND(((STDDEV(pemesanan.jumlah_pesanan) / AVG(pemesanan.jumlah_pesanan)) / (STDDEV(produksi.jumlah_produksi) / AVG(produksi.jumlah_produksi))), 3) AS BE,
	produksi.lead_time,
	ROUND((1 + ((2 * produksi.lead_time) / 30) + ((2 * produksi.lead_time ^ 2) / (30 ^ 2))), 3) AS parameter,
	ROUND(((STDDEV(pemesanan.jumlah_pesanan) / AVG(pemesanan.jumlah_pesanan)) / (STDDEV(produksi.jumlah_produksi) / AVG(produksi.jumlah_produksi))) > 1 + ((2 * produksi.lead_time) / 30) + ((2 * produksi.lead_time ^ 2) / (30 ^ 2)), 3) AS Bullwhip_Effect
FROM
	barang
	INNER JOIN pemesanan ON pemesanan.id_barang = barang.id_barang
	INNER JOIN produksi ON produksi.id_barang = pemesanan.id_barang
GROUP BY
	barang.nama_barang,
	produksi.lead_time");


$xml = new SimpleXMLElement('<root/>');
$datas = mysqli_fetch_assoc($sql);

while($result = mysqli_fetch_array($sql))
{
    $data = $xml->addChild('data');
    $data->addAttribute('nama_barang', $result['nama_barang']);
    $data->addChild('nama_barang', $result['nama_barang']);
    $data->addChild('s_order', $result['s_order']);
    $data->addChild('mean_order', $result['mean_order']);
    $data->addChild('s_demand', $result['s_demand']);
    $data->addChild('mean_demand', $result['mean_demand']);
    $data->addChild('cv_order', $result['cv_order']);
    $data->addChild('cv_demand', $result['cv_demand']);
    $data->addChild('BE', $result['BE']);
    $data->addChild('lead_time', $result['lead_time']);
    $data->addChild('parameter', $result['parameter']);
    $data->addChild('Bullwhip_Effect', $result['Bullwhip_Effect']);
}

$dom = new DOMDocument('1.0');
$dom->preserveWhiteSpace = false;
$dom->formatOutput = true;
$dom->loadXML($xml->asXML());

header('Content-Type: text/xml');
echo $dom->saveXML();