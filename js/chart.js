var dynamicColors = function () {
    var r = Math.floor(Math.random() * 255);
    var g = Math.floor(Math.random() * 255);
    var b = Math.floor(Math.random() * 255);
    return "rgb(" + r + "," + g + "," + b + ")";
}

var datas = [];

fetch('api.php?data=dashboard-manager')
    .then((response) => response.text())
    .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
    .then(data => {
        var k = data.getElementsByTagName("nama_barang");
        for (i = 0; i < k.length; i++) {
            var d = {
                label: data.getElementsByTagName("nama_barang")[i].childNodes[0].nodeValue,
                data: [
                    data.getElementsByTagName("s_order")[i].childNodes[0].nodeValue,
                    data.getElementsByTagName("mean_order")[i].childNodes[0].nodeValue,
                    data.getElementsByTagName("s_demand")[i].childNodes[0].nodeValue,
                    data.getElementsByTagName("mean_demand")[i].childNodes[0].nodeValue,
                    data.getElementsByTagName("cv_order")[i].childNodes[0].nodeValue,
                    data.getElementsByTagName("cv_demand")[i].childNodes[0].nodeValue,
                    (data.getElementsByTagName("BE")[i].childNodes[0] ? data.getElementsByTagName("BE")[i].childNodes[0].nodeValue : 0),
                    data.getElementsByTagName("lead_time")[i].childNodes[0].nodeValue,
                    data.getElementsByTagName("parameter")[i].childNodes[0].nodeValue,
                    (data.getElementsByTagName("Bullwhip_Effect")[i].childNodes[0] ? data.getElementsByTagName("Bullwhip_Effect")[i].childNodes[0].nodeValue : 0),
                ],
                backgroundColor: dynamicColors()
            };
            datas.push(d);
        }
    });


setTimeout(function () {
    const labels = [
        's_order', 'mean_order', 's_demand', 'mean_demand',
        'cv_order', 'cv_demand', 'BE', 'lead_time', 'parameter', 'Bullwhip_Effect'
    ];
    const data = {
        labels: labels,
        datasets: [...datas]
    };

    const config = {
        type: 'bar',
        data: data,
        options: {}
    };

    const myChart = new Chart(
        document.getElementById('myChart'),
        config
    );
}, 2000);