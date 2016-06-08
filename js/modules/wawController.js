define([], function(){
    function controller ($scope, $timeout) {
        var s = $scope;
        s.findDelay = 100;
        s.timeLimit = 10;
        s.findLimit = 10;
        s.generated = [];
        s.paths = [
            {
                path: ['n','s','n','s','n','s','n','s','n','s'],
                expectedResult: true
            },
            {
                path: ['w','e','w','e','w','e','w','e','w','e','w','e'],
                expectedResult: false
            },
            {
                path: ['w'],
                expectedResult: false
            },
            {
                path: ['n','n','n','s','n','s','n','s','n','s'],
                expectedResult: false
            },
            {
                path: ['s','s','e','e','n','n','w','w'],
                expectedResult: false
            },
            {
                path: ['n','n','n','e','e','s','s','s', 'w', 'w'],
                expectedResult: true
            }
        ];
        
        s.startCheck = function(){
            s.paths.forEach(function(pDef){
                pDef.isChecked = true;
                pDef.calculatedResult = s.checkFn(pDef.path);
            });
        };
        
        s.reset = function(){
            s.paths.forEach(function(pDef){
                delete pDef.isChecked;
                delete pDef.calculatedResult;
            });
            s.generated = [];
            s.lastChecked = null;
        };
        
        s.startFind = function(){
            if (s.findInProgress){
                s.findInProgress = false;
                s.neededValid = 0;
            }else{
                s.neededValid = s.findLimit || 10;
                s.findInProgress = true;
                s.findNext();                
            }            
        };
        
        s.continueFind = function(){
            if (s.neededValid > 0 && !!s.findInProgress){
                $timeout(function(){
                    s.findNext();
                }, s.findDelay || 1000);
            }else{
                s.lastChecked = null;
                s.findInProgress = false;
            }
        };
        s.findNext = function(){
            var calculatedResult, item;
            item = s.generateTestItem();                
            calculatedResult = s.checkFn(item.path);
            if (calculatedResult){
                item.calculatedResult = calculatedResult;
                s.generated.push(item);
                s.neededValid--;
            }
            s.lastChecked = item;
            s.continueFind();
        };
        
        /**
         * 
         * @param {String[]} pathArr
         * @returns {Boolean}
         */
        s.checkFn = function(pathArr){
            var movedX, movedY;
            
            if (pathArr.length !== s.timeLimit){
                return false;
            }
            movedX = movedY = 0;
            pathArr.forEach(function(move){
                movedX += move === 'w' ? 1 : move === 'e' ? -1 : 0;
                movedY += move === 's' ? 1 : move === 'n' ? -1 : 0;
            });
            
            return movedX === 0 && movedY === 0;
        };
        
        s.generateTestItem = function(){
            var w, count, moves;
            w = ['n', 's', 'e', 'w'];
            count = 10;
            moves = [];
            
            while (count > 0){
                moves.push( w[rand(0,3)] );
                count--;           
            }
            
            return {
                path: moves
            };
        };
        
        function rand(min, max){
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
    }
    
    return controller;
});