function generateLinks() {
  var formData = [];
  var siteInfo = {};
  var linksList = [];
  var linksBasis = "http://logx.xiti.com/go.url?xts=123456789&xtor=";
  var linkUrl = "";
  
  formData.push($("#ParamA").val());
  formData.push($("#ParamB").val());
  formData.push($("#ParamC").val().split('\n'));
  formData.push($("#ParamD").val());
  formData.push($("#ParamE").val().split('\n'));
  formData.push($("#ParamF").val());
  formData.push($("#ParamG").val());
  
  siteInfo.http = $("#siteHttp").val();
  siteInfo.log = $("#siteLog").val();
  siteInfo.domain = $("#siteDomain").val();
  siteInfo.go = $("#siteGo").val();
  siteInfo.number = $("#siteNumber").val();
  
  console.log(siteInfo);
  
  linksBasis = siteInfo.http+"://"+siteInfo.log+"."+siteInfo.domain+"/"+siteInfo.go+"?xts="+siteInfo.number+"&xtor=";
  
  var currentLink = linksBasis;
  processParam(formData,0,formData.length);
  
  var displayTable = '<table class="table"><thead><tr><th>Link</th></tr></thead><tbody>'
  for(j = 0; j < linksList.length; j++) {
    displayTable += '<tr><td>'+linksList[j][0]+'&url='+linksList[j][1]+'</td></tr>';
  }
  displayTable += '</tbody></table>';
  
  //processParam(formData, 0);
  
  $("#result").html(displayTable);
  
  function processParam(paramData, paramIndex, maxIndex) {
    if(paramIndex == maxIndex) linksList.push([currentLink,linkUrl]);
    else {
      if(Array.isArray(paramData[paramIndex])) {
        var lastLinkStep = currentLink;
        for (var i = 0, count = paramData[paramIndex].length; i < count; i++) { 
          console.log("Param "+paramIndex+" loop #"+i+"/"+paramData[paramIndex].length+" - "+lastLinkStep);
          // If link param, cut the value
          if(paramIndex == 4) {
            linkUrl = "";
            var cutLink = paramData[paramIndex][i].split('|');
            linkUrl = cutLink[1];
            currentLink = lastLinkStep+cutLink[0]+"-";
          } else {
            currentLink = lastLinkStep+paramData[paramIndex][i]+"-";
          }
          processParam(paramData,paramIndex+1,maxIndex);
        }
      } else {
        currentLink += paramData[paramIndex]+"-";
        processParam(paramData,paramIndex+1,maxIndex);
      }
    }
  }
}