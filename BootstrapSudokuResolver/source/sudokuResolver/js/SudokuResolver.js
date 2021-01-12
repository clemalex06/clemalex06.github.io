SudokuResolver = {};
SudokuResolver.Grid = [];
SudokuResolver.CellToSolveList = [];
SudokuResolver.GridResolved = false;
SudokuResolver.CurrentIndice = 0;
SudokuResolver.ExceptionThrown = false;

SudokuResolver.resolveGrid = function () {
    try {
        if (!SudokuResolver.ExceptionThrown) {
            this.initGrid();
            this.initCellToSolveList();
        }
        if (this.CellToSolveList.length > 0) {
			do{
				this.CurrentIndice = this.computeResultGrid(this.CurrentIndice);
			}while(!this.GridResolved || (this.CurrentIndice===0 && this.CellToSolveList[0].index + 1 === this.CellToSolveList[0].possibleValues.length))
            
        }
        if (this.GridResolved) {
            alert('the grid is solved');
            this.drawResult();
        } else {
            alert('unable to solve the grid');
        }
    }
    catch (e) {
        alert("Exception thrown" + e);
        console.error(e);
        SudokuResolver.ExceptionThrown = true;
    }
    finally {
        $("#ResolutionInProgress").modal('hide');
    }

};

SudokuResolver.initGrid = function () {
    this.Grid = [];
    SudokuResolver.CellToSolveList = [];
    for (var i = 1; i < 10; i++) {
        var row = [];
        var cell_value = null;
        for (var j = 1; j < 10; j++) {
            var idCell = "#cell-" + i + "-" + j;
            var valueselect = $(idCell).children().val();
            switch (valueselect) {
                case '-':
                    cell_value = {
                        toSolve: true,
                        value: 0
                    };
                    row.push(cell_value);
                    break;
                case '1':
                    cell_value = {
                        toSolve: false,
                        value: 1
                    };
                    row.push(cell_value);
                    break;
                case '2':
                    cell_value = {
                        toSolve: false,
                        value: 2
                    };
                    row.push(cell_value);
                    break;
                case '3':
                    cell_value = {
                        toSolve: false,
                        value: 3
                    };
                    row.push(cell_value);
                    break;
                case '4':
                    cell_value = {
                        toSolve: false,
                        value: 4
                    };
                    row.push(cell_value);
                    break;
                case '5':
                    cell_value = {
                        toSolve: false,
                        value: 5
                    };
                    row.push(cell_value);
                    break;
                case '6':
                    cell_value = {
                        toSolve: false,
                        value: 6
                    };
                    row.push(cell_value);
                    break;
                case '7':
                    cell_value = {
                        toSolve: false,
                        value: 7
                    };
                    row.push(cell_value);
                    break;
                case '8':
                    cell_value = {
                        toSolve: false,
                        value: 8
                    };
                    row.push(cell_value);
                    break;
                case '9':
                    cell_value = {
                        toSolve: false,
                        value: 9
                    };
                    row.push(cell_value);
                    break;
                default:
                    break;
            }
        }
        this.Grid.push(row);
    }
};


SudokuResolver.initCellToSolveList = function () {
    this.CellToSolveList = [];
    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            if (this.Grid[i][j].value === 0) {
                var cellPossiblesValues = {
                    x: i,
                    y: j,
                    index: -1,
                    possibleValues: []
                };
                for (var k = 1; k < 10; k++) {
                    if (this.IsPossibleOnLine(k, i) && this.IsPossibleOnColumn(k, j) && this.IsPossibleOnBlock(k, i, j)) {
                        cellPossiblesValues.possibleValues.push(k);
                    }
                }
                this.CellToSolveList.push(cellPossiblesValues);
            }
        }
    }
    this.CellToSolveList.sort(function (a, b) {
        if (a.possibleValues.length < b.possibleValues.length) {
            return -1;
        }
        if (a.possibleValues.length > b.possibleValues.length) {
            return 1;
        }
        return 0;
    });
};

SudokuResolver.IsPossibleOnLine = function (testValue, numberLine) {
    for (var i = 0; i < 9; i++) {
        if (this.Grid[numberLine][i].value === testValue) {
            return false;
        }
    }
    return true;
};

SudokuResolver.IsPossibleOnColumn = function (testValue, numberColumn) {
    for (var i = 0; i < 9; i++) {
        if (this.Grid[i][numberColumn].value === testValue) {
            return false;
        }
    }
    return true;
};

SudokuResolver.IsPossibleOnBlock = function (testValue, numberLine, numberColumn) {
    var _i = numberLine - (numberLine % 3), _j = numberColumn - (numberColumn % 3);  // ou encore : _i = 3*(i/3), _j = 3*(j/3);
    for (i = _i; i < _i + 3; i++) {
        for (j = _j; j < _j + 3; j++) {
            if (this.Grid[i][j].value === testValue)
                return false;
        }
    }
    return true;
};

SudokuResolver.resetGrid = function (e) {
    e.preventDefault();
    SudokuResolver.Grid = [];
    SudokuResolver.CellToSolveList = [];
	SudokuResolver.GridResolved = false;
	SudokuResolver.CurrentIndice = 0;
	SudokuResolver.ExceptionThrown = false;
    for (var i = 1; i < 10; i++) {
        for (var j = 1; j < 10; j++) {
            var idCell = "#cell-" + i + "-" + j;
            $(idCell).empty();
            var selectCell = $("<select></select>");
            var optionCell = $("<option selected></option>").text('-');
            $(selectCell).append(optionCell);
            for (var k = 1; k < 10; k++) {
                optionCell = $("<option></option>").text(k).val(k);
                $(selectCell).append(optionCell);
            }

            $(idCell).append(selectCell);
        }
    }

    $("#resolveButton").prop('disabled', false);

};

SudokuResolver.drawResult = function () {
    for (var i = 0; i < this.Grid.length; i++) {
        for (var j = 0; j < this.Grid[i].length; j++) {
            var idCell = "#cell-" + (i + 1) + "-" + (j + 1);
            $(idCell).empty();

            var valueToDisplay = $("<span></span>").text(this.Grid[i][j].value);

            if (this.Grid[i][j].toSolve) {
                valueToDisplay.addClass("cell-result-found");
            } else {
                valueToDisplay.addClass("cell-result-not-found");
            }

            $(idCell).append(valueToDisplay);
        }
    }

    $("#resolveButton").prop('disabled', true);
};

SudokuResolver.computeResultGrid = function (indice) {
    var mustRollback = true;

    for (var i = this.CellToSolveList[indice].index + 1; i < this.CellToSolveList[indice].possibleValues.length; i++) {
        this.CellToSolveList[indice].index = i;
        var valueToTest = this.CellToSolveList[indice].possibleValues[i];
        var isGoodValue = this.IsPossibleOnLine(valueToTest, this.CellToSolveList[indice].x)
            && this.IsPossibleOnColumn(valueToTest, this.CellToSolveList[indice].y)
            && this.IsPossibleOnBlock(valueToTest, this.CellToSolveList[indice].x, this.CellToSolveList[indice].y);
        if (isGoodValue) {
            this.Grid[this.CellToSolveList[indice].x][this.CellToSolveList[indice].y].value = valueToTest;
            mustRollback = false;
            break;
        }
    }

    if (mustRollback) {
        this.CellToSolveList[indice].index = -1;
        this.Grid[this.CellToSolveList[indice].x][this.CellToSolveList[indice].y].value = 0;
        if (indice === 0) {
            this.GridResolved = false;
			return indice;
        } else {
            return indice - 1;
        }
    } else {
        if (indice === this.CellToSolveList.length - 1) {
            this.GridResolved = true;
			return indice;
        } else {
            return indice + 1;
        }
    }
};

$(document).ready(function () {
    $("#resolveButton").on("click", function (e) {
        e.preventDefault();
        $("#ResolutionInProgress").modal();
        setTimeout('SudokuResolver.resolveGrid()', 10);
    });

    $("#resetButton").on("click", function (e) {
        SudokuResolver.resetGrid(e);
    });
});