var dynamicColors = function () {
    var r = Math.floor(Math.random() * 255);
    var g = Math.floor(Math.random() * 255);
    var b = Math.floor(Math.random() * 255);
    return "rgb(" + r + "," + g + "," + b + ")";
}

var datas = [];
var apiLabels = [];
var apiSOrder = [];
var apiMeanOrder = [];
var apiSDemand = [];
var apiMeanDemand = [];
var apiCVOrder = [];
var apiCVDemand = [];
var apiBE = [];
var apiLeadTime = [];
var apiParameter = [];
var apiBullwhipEffect = [];

fetch('api.php?data=dashboard-manager')
    .then((response) => response.text())
    .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
    .then(data => {
        var k = data.getElementsByTagName("nama_barang");
        for (i = 0; i < k.length; i++) {
            apiLabels.push(data.getElementsByTagName("nama_barang")[i].childNodes[0].nodeValue);
            apiSOrder.push(data.getElementsByTagName("s_order")[i].childNodes[0].nodeValue);
            apiSDemand.push(data.getElementsByTagName("s_demand")[i].childNodes[0].nodeValue);
            apiMeanOrder.push(data.getElementsByTagName("mean_order")[i].childNodes[0].nodeValue);
            apiMeanDemand.push(data.getElementsByTagName("mean_demand")[i].childNodes[0].nodeValue);
            apiCVOrder.push(data.getElementsByTagName("cv_order")[i].childNodes[0].nodeValue);
            apiCVDemand.push(data.getElementsByTagName("cv_demand")[i].childNodes[0].nodeValue);
            apiBE.push(data.getElementsByTagName("BE")[i].childNodes[0] ? data.getElementsByTagName("BE")[i].childNodes[0].nodeValue : 0);
            apiLeadTime.push(data.getElementsByTagName("lead_time")[i].childNodes[0].nodeValue);
            apiParameter.push(data.getElementsByTagName("parameter")[i].childNodes[0].nodeValue);
            apiBullwhipEffect.push(data.getElementsByTagName("Bullwhip_Effect")[i].childNodes[0] ? data.getElementsByTagName("Bullwhip_Effect")[i].childNodes[0].nodeValue : 0);
        }
    });


setTimeout(function () {
    var dataSets = [
        {
            label: 's_order',
            data: apiSOrder,
            backgroundColor: dynamicColors()
        },
        {
            label: 's_demand',
            data: apiSDemand,
            backgroundColor: dynamicColors()
        },
        {
            label: 'mean_order',
            data: apiMeanOrder,
            backgroundColor: dynamicColors()
        },
        {
            label: 'mean_demand',
            data: apiMeanDemand,
            backgroundColor: dynamicColors()
        },
        {
            label: 'cv_order',
            data: apiCVOrder,
            backgroundColor: dynamicColors()
        },
        {
            label: 'cv_demand',
            data: apiCVDemand,
            backgroundColor: dynamicColors()
        },
        {
            label: 'BE',
            data: apiBE,
            backgroundColor: dynamicColors()
        },
        {
            label: 'lead_time',
            data: apiLeadTime,
            backgroundColor: dynamicColors()
        },
        {
            label: 'parameter',
            data: apiParameter,
            backgroundColor: dynamicColors()
        },
        {
            label: 'Bullwhip_Effect',
            data: apiBullwhipEffect,
            backgroundColor: dynamicColors()
        },
    ];

    const config = {
        type: 'bar',
        data: {
            labels: [...apiLabels],
            datasets: dataSets
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Laporan'
                },
                zoom: {
                    zoom: {
                        wheel: {
                            enabled: true
                        }
                    }
                }
            },
            scales: {
                y: {
                    display: false
                }
            }
        }
    };

    const myChart = new Chart(
        document.getElementById('myChart'),
        config
    );
}, 2000);