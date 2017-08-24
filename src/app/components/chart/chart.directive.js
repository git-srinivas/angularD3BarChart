  (function() {
    'use strict';

    angular
    .module('angularSeedApp')
    .directive('chartComponent', chartComponent);

    /** @ngInject */
    function chartComponent($window) {
      var directive = {
        restrict: 'E',
        templateUrl: 'app/components/chart/chart.html',
        scope: {
          data: '='
        },
        controller: ChartController,
        controllerAs: 'vm',
        bindToController: true,
        link: linker
      };

      return directive;

      /** @ngInject */
      function ChartController($scope) {
        console.log($scope.vm.data)
      }
      /** @ngInject */
      function linker(scope,elements,attributes){
        //setting jumbotron width to svg for responsive ness
        var margin = {top: 30, right: 10, bottom: 30, left: 10}
            , width = parseInt(d3.select('.jumbotron').style('width'), 10)
            , width = width - margin.left - margin.right
            , barHeight = 60
            , percent = d3.format('%')
            , scaleFactor = 150;
        if(width>600){
          width = parseInt(width/3);
          scaleFactor = 200;
        }
        //scope.data = {"buttons":[-15,-18,20,70,20],"bars":[34,75,20,60],"limit":190}
        scope.chartModel = {
          barsArray :[]

        };
        console.log(scope.vm.data)
        if(scope.vm.data){
          scope.data = scope.vm.data;
        }
        scope.vm.data.bars.map(function(value,index){
          var barPercentage = parseInt(parseFloat(value/scope.data.limit)*100);
          scope.chartModel.barsArray.push({id:index,value:value,percent:barPercentage,name:"#progress"+(index+1)})
        })

        scope.chartModel.chartSelected = scope.chartModel.barsArray[0];
        scope.handleClick = function(value){
          if(scope.chartModel.chartSelected.id >= 0){
            var chartId = scope.chartModel.chartSelected.id;
            var gradientPercent = scope.chartModel.barsArray[chartId].percent;
            gradientPercent += parseInt(parseFloat(value/scope.data.limit)*100);
            if(gradientPercent>0){
                scope.chartModel.barsArray[chartId].percent = gradientPercent;
            }
            else{
                scope.chartModel.barsArray[chartId].percent = 0;
            }

            if(scope.chartModel.barsArray[chartId].percent >= 0){
                if(gradientPercent >= 100){
                    $window.d3.select("#bar"+chartId)
                        .style("fill", function(d, i){
                            return "url(#redgradient)"})
                }
                else{
                  var x1 = parseInt(parseFloat(width/scaleFactor)*scope.chartModel.barsArray[chartId].percent)+"%";
                  $window.d3.select("#bar"+chartId)
                      .style("fill", function(d, i){
                        return "url(#gradient"+chartId+")"})
                  $window.d3.select("#gradient"+chartId)
                      .transition()
                      .duration(200)
                      .attr("x1", x1)
                }

            }
            else{
                $window.d3.select("#gradient"+chartId).attr("x2", 200+"%")
            }
            //set text value on change
            mytext.data(scope.chartModel.barsArray)
                .attr("id",function(d,i) { return "text"+i})
                .attr("x", function(d) { return width/2; })
                .attr("y", barHeight/2)
                .attr("dy", ".35em")
                .text(function(d) { return d.percent+"%"; });
          }

        }
        //create svg for gradients
        var svg = $window.d3.select("body").append("svg:svg")
            .attr("width", width)
            .attr("height", barHeight);

        // generating gradients for given bar inputs
        scope.chartModel.barsArray.map(function(barData,index){
          console.log(index)
          generateGradient(index,barData.value)
        });
        generateRedGradient();

        //create rectangular bars and append them to svg
        var chart = $window.d3.select(".chart")
            .attr("width", width)
            .attr("height", barHeight * (scope.chartModel.barsArray.length+2));
        var bar = chart.selectAll("g")
            .data(scope.chartModel.barsArray)
            .enter().append("g")
            .attr("transform", function(d, i) {
              var height = parseInt(1.3 * i * barHeight);
              return "translate(0,"+ height+ ")"; });
          //draw bars
          bar.append("rect")
              .attr("id",function(d, i){return "bar"+i})
              .attr("width", width)
              .attr("height", barHeight - 1)
              .style("fill", function(d, i) { return "url(#gradient"+i+")"})
              .attr("stroke","black")
              .attr("stroke-width","1");

          //add text to the bars
          var mytext = bar.append("text")
              .attr("id",function(d,i) { return "text"+i})
              .attr("x", function(d) { return width/2; })
              .attr("y", barHeight/2)
              .attr("dy", ".35em")
              .text(function(d) { return d.percent+"%"; })
              .style("font-size",15);

          function generateGradient(id,barValue){
            var gradient = svg.append("svg:defs")
                .append("svg:linearGradient")
                .attr("id", "gradient"+id)
                .attr("x1", parseInt(parseFloat(width/scaleFactor)*scope.chartModel.barsArray[id].percent)+"%")
                .attr("y1", "0%")
                .attr("x2", "0%")
                .attr("y2", "0%")
                .attr("spreadMethod", "pad");

            gradient.append("svg:stop")
                .attr("offset", "50%")
                .attr("stop-color", "white")
                .attr("stop-opacity", 1);

            gradient.append("svg:stop")
                .attr("offset", "50%")
                .attr("stop-color", "steelblue")
                .attr("stop-opacity", 1);
          }
          //generate red color gradient
          function generateRedGradient(){
            var gradient = svg.append("svg:defs")
                .append("svg:linearGradient")
                .attr("id", "redgradient")
                .attr("x1", "200%")
                .attr("y1", "0%")
                .attr("x2", "0%")
                .attr("y2", "0%")
                .attr("spreadMethod", "pad");

            gradient.append("svg:stop")
                .attr("offset", "50%")
                .attr("stop-color", "white")
                .attr("stop-opacity", 1);

            gradient.append("svg:stop")
                .attr("offset", "50%")
                .attr("stop-color", "red")
                .attr("stop-opacity", 1);
          }

        }
      }

    })();
