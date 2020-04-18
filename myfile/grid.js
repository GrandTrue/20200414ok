window.onload = function(){



var mapSketch = function(p5j){
    p5j.bikejson; // 修改匯入資料名

    p5j.loaded = 0; // 確認是否有讀取檔案
    p5j.map = L.map('map').setView([25,121], 9); // 台北 經緯度 比例

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(p5j.map); // 將openstreetmap資料下載到 畫面中



    p5j.preload = function() { // 需要先讀取 json
      // 若資料不允許即時取用 可先存在本地端
      let url = './myfile/data.json';

      p5j.httpGet(url, 'json', false, function(response) {
        p5j.bikejson = response; // 修改匯入資料名
      });
    }

    p5j.setup = function(){
    }
    p5j.draw = function(){
      if (!p5j.bikejson) {
        // Wait until the earthquake data has loaded before drawing.
        return;
      }else {
        if (p5j.loaded===1){ // 只執行一次
          console.log(p5j.bikejson.result.records);

          p5j.bikejson.result.records.forEach((val)=>{
            
            L.circle([val.Py, val.Px], { // 緯度在前面
                color: 'red',
                fillColor: '#f03',
                fillOpacity: 0.2,
                stroke: false, // 取消邊線
                radius: 150 // 強度 乘上大小單位為公尺
            }

            ).addTo(p5j.map).bindPopup(val.Name);
        
          });
        }
        p5j.loaded +=1;
      }
    }
}
  
new p5(mapSketch, 'map');
}