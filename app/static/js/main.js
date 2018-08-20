$(document).ready(function() {
    
    LoadTime();

    $('#first-meters, #second-meters, #third-meters').on('input', function(e) {
        UpdateValues();
    });

    $('.abt, .hour').on('input', function(e) {
        UpdateValues();
    });


});

var letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K'];

function UpdateValues() {
    GetFirstLetter();
    GetSecondLetter();
    GetFirstRnt();
    GetFirstTbt();
    GetThirdLetter();
    GetFourthLetter();
    GetSecondRnt();
    GetSecondTbt();
    GetFifthLetter();
};

function GetFirstLetter() {
    var metersNumber = $('#first-meters').val();
    var abt = $('#first-abt').val();
    var result = PressureGroup(metersNumber, abt);
    $('#first-letter').val(result);
};

function GetSecondLetter() {
    var diverLetter = $('#first-letter').val();
    var intervalHour = $('#first-hour').val();
    var intervalMinute = $('#first-minute').val();
    var secondLetter = GetSurfaceInterval(diverLetter, intervalHour, intervalMinute);
    $('#second-letter').val(secondLetter);
};

function GetThirdLetter() {
    var metersNumber = $('#second-meters').val();
    var tbt = $('#first-tbt').val();
    var result = PressureGroup(metersNumber, tbt);
    $('#third-letter').val(result);
}

function GetFourthLetter() {
    var diverLetter = $('#third-letter').val();
    var intervalHour = $('#second-hour').val();
    var intervalMinute = $('#second-minute').val();
    var fourthLetter = GetSurfaceInterval(diverLetter, intervalHour, intervalMinute);
    $('#fourth-letter').val(fourthLetter);
}

function GetFifthLetter() {
    var metersNumber = $('#third-meters').val();
    var tbt = $('#second-tbt').val();
    var result = PressureGroup(metersNumber, tbt);
    $('#fifth-letter').val(result);
}

function GetFirstRnt() {
    var diverLetter = $('#second-letter').val();
    var metersDepth = $('#second-meters').val();
    var actualTime = $('#second-abt').val();
    var residualNitrogen = GetResidualNitrogen(diverLetter, metersDepth, actualTime);
    $('#first-rnt').val(residualNitrogen);
};

function GetSecondRnt() {
    var diverLetter = $('#fourth-letter').val();
    var metersDepth = $('#third-meters').val();
    var actualTime = $('#third-abt').val();
    var residualNitrogen = GetResidualNitrogen(diverLetter, metersDepth, actualTime);
    $('#second-rnt').val(residualNitrogen);
}

function GetFirstTbt() {
    var abt = $('#second-abt').val();
    var tbt = $('#first-rnt').val();
    var tbt = GetTbt(abt, tbt);
    $('#first-tbt').val(tbt);
}

function GetSecondTbt() {
    var abt = $('#third-abt').val();
    var tbt = $('#second-rnt').val();
    var tbt = GetTbt(abt, tbt);
    $('#second-tbt').val(tbt);
}

function LoadTime() {
    var currentDate = new Date();
    var timeHours = currentDate.getHours();
    if (timeHours < 10) {
        timeHours = "0" + timeHours;
    }
    var timeMinutes = currentDate.getMinutes();
    if (timeMinutes < 10) {
        timeMinutes = "0" + timeMinutes;
    }
    var currentTime = timeHours + ":" + timeMinutes;
    $('#start-time').val(currentTime);
};

function PressureGroup(metersInput, abt) {
    var result = 'X';
    var table1 = [
        [0, [60, 120, 210, 300]],
        [3, [60, 120, 210, 300]],
        [4.5, [35, 70, 110, 160, 225, 350]],
        [6, [25, 50, 75, 110, 135, 180, 240, 325]],
        [7.5, [20, 35, 55, 75, 100, 125, 160, 190, 245]],
        [9, [15, 30, 45, 60, 75, 95, 120, 145, 170, 205]],
        [10.5, [5, 15, 25, 40, 50, 60, 80, 100, 120, 140, 160]],
        [12, [5, 15, 25, 30, 40, 50, 70, 80, 100, 110, 130]],
        [15, [0, 10, 15, 25, 30, 40, 50, 60, 70]],
        [18, [0, 10, 15, 20, 25, 30, 40, 50]],
        [21, [0, 5, 10, 15, 20, 30, 35, 40]],
        [24, [0, 5, 10, 15, 20, 25, 30]],
        [27, [0, 5, 10, 12, 15, 20, 25]],
        [30, [0, 5, 7, 10, 15, 20]],
        [33, [0, 0, 5, 10, 13, 15]],
        [36, [0, 0, 5, 10]],
        [39, [0, 0, 5]]
    ];
    
    var tableIndex = 1000;
    for (var i=1; i <17; i++) {
        var firstDepth = table1[i][0];
        var secondDepth = table1[i - 1][0];

        if (metersInput <= firstDepth && metersInput > secondDepth ) {
            tableIndex = i;
        }
    }

    var letterIndex = 100;
    if (table1[tableIndex] == null) {
        result = '';
    } else {
        var timeRow = table1[tableIndex][1];
        for (var i=0; i < timeRow.length; i++) {
            if (i == 0) {
                if (timeRow[i] >= abt) {
                    letterIndex = i;
                }
            } else {
                if (timeRow[i - 1] < abt && timeRow[i] >= abt) {
                    letterIndex = i;
                }
            }
        }
    }

    result = letters[letterIndex];
    return result;
};

function GetSurfaceInterval(diveLetter, residualHour, residualMinute) {
    var result = 'A';
    var table2 = [
        ['A', [720]],
        ['B', [720, 200]],
        ['C', [720, 289, 99]],
        ['D', [720, 348, 158, 96]],
        ['E', [720, 425, 204, 117, 54]],
        ['F', [720, 425, 237, 148, 89, 45]],
        ['G', [720, 455, 265, 178, 119, 75, 40]],
        ['H', [720, 479, 289, 200, 143, 101, 66, 36]],
        ['I', [720, 501, 312, 223, 164, 122, 89, 59, 33]],
        ['J', [720, 530, 340, 242, 184, 140, 107, 79, 54, 31]],
        ['K', [720, 538, 348, 259, 201, 158, 123, 95, 71, 49, 28]]
    ];
    
    residualHour = residualHour == ''? 0 : residualHour;
    residualMinute = residualMinute == ''? 0 : residualMinute;

    var residualTime = (parseInt(residualHour) * 60) + parseInt(residualMinute);
    if (residualTime > 720) {
        residualTime = 720;
    }

    var rowIndex;
    
    for (var i=0; i < 11; i++) {
        if (table2[i][0] == diveLetter) {
            rowIndex = i;
            break;
        }
    }
    
    if (rowIndex == null) {
        result = '';
    } else {
        var timeRange = table2[rowIndex][1];
        var letterIndex = 0;
        for (var i=0; i < timeRange.length; i++) {
            
            if (residualTime <= timeRange[i]) {
                letterIndex = i;
            }
        }
        result = letters[letterIndex];
    }
    
    return result;
};

function GetResidualNitrogen(groupLetter, diveDepth, actualBottomTime) {
    var table3 = [
        [3, [39, 88, 159, 279]],
        [6, [18, 39, 62, 88, 120, 159, 208, 279, 399]],
        [9, [12, 25, 39, 54, 70, 88, 109, 132, 159, 190]],
        [12, [7, 17, 25, 37, 49, 61, 73, 87, 101, 116]],
        [15, [6, 13, 21, 29, 38, 47, 56, 66]],
        [18, [5, 11, 17, 24, 30, 36, 44]],
        [21, [4, 9, 15, 20, 26, 31, 37]],
        [24, [4, 8, 13, 18, 23, 28]],
        [27, [3, 7, 11, 16, 20, 24]],
        [30, [3, 7, 10, 14, 18]],
        [33, [3, 6, 10, 13]],
        [36, [3, 6, 9]],
        [39, [3]]
    ];

    diveDepth = diveDepth == ''? 0 : diveDepth;

    var rowIndex;
    for (var i=table3.length - 1; i >= 0; i--) {
        var rowMeters = table3[i][0];
        if (parseInt(diveDepth) <= rowMeters) {
            rowIndex = i;
        }
    }

    var letterIndex;
    for (i=0; i <= 10; i++) {
        if (letters[i] == groupLetter) {
            letterIndex = i;
        }
    }

    var result = table3[rowIndex][1][letterIndex];
    return result;
};

function GetTbt(abt, rnt) {
    var result;
    abt = abt == ''? 0 : abt;
    rnt = rnt == ''? 0 : rnt;
    result = parseFloat(abt) + parseFloat(rnt);
    return result;
}