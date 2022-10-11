<template>
    <ion-page>
        <ion-header :translucent="true">
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-menu-button color="primary"></ion-menu-button>
                </ion-buttons>
                <ion-title>Operações Elementares</ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content :fullscreen="true">
            <ion-header collapse="condense">
                <ion-toolbar>
                    <ion-title size="large">Operações Elementares</ion-title>
                </ion-toolbar>
            </ion-header>

            <div id="container">
                <strong class="capitalize">Operações Elementares</strong>
                <p>Insira os valores na matriz</p>

                <div id="matrix" class="grid-container">
                    <div id="tableButtons" class="grid-item">
                        <ion-button id="addDimension" color="primary" fill="outline" size="small" @click="addDimension">
                            +
                        </ion-button>
                        <ion-button id="removeDimension" color="primary" fill="outline" size="small"
                            @click="removeDimension">-
                        </ion-button>
                        <ion-button id="clearTable" color="primary" fill="outline" size="small" @click="clearTable">
                            Limpar</ion-button>
                        <ion-button id="textInput" color="primary" fill="outline" size="small" @click="textInput">Texto
                        </ion-button>
                    </div>
                    <div id="tableInput" class="grid-item">
                        <div class="table-wrapper">
                            <table id="matrixTable">
                                <tr v-for="(row, index) in matrix" :key="index" v-bind:id="'row-'+index">
                                    <td v-for="(cell, index2) in row" :key="index2" v-bind:id="'column-'+index2">
                                        <ion-input placeholder="0" v-model="matrix[index][index2]">
                                        </ion-input>
                                    </td>
                                </tr>
                            </table>
                            <table id="unknownsTable">
                                <tr v-for="(row, index) in unknownsColumn" :key="index" v-bind:id="'row2-'+index">
                                    <td v-bind:id="'column2-'+index">
                                        <ion-input placeholder="0" v-model="unknownsColumn[index]">
                                        </ion-input>
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </div>
                    <div id="actionButtons" class="grid-item">
                        <ion-button id="undo" color="primary" fill="outline" size="small"
                            :disabled="undoPile.length == 1" @click="undoAction">Desfazer
                        </ion-button>
                        <ion-button id="redo" color="primary" fill="outline" size="small"
                            :disabled="redoPile.length == 1" @click="redoAction">Refazer
                        </ion-button>
                    </div>
                    <div class="hr grid-item">
                    </div>
                    <div class="grid-item">
                        <ion-label>
                            <h2>Selecionar operação</h2>
                        </ion-label>
                    </div>
                    <div class="grid-item">
                        <ion-select placeholder="Selecionar operação" @ionChange="selectOperation($event.detail.value)">
                            <ion-select-option value="op1">Constante x linha</ion-select-option>
                            <ion-select-option value="op2">Permutar linhas</ion-select-option>
                            <ion-select-option value="op3">Somar a um pivô x constante</ion-select-option>
                        </ion-select>
                    </div>
                    <div class="grid-item">
                        <div class="grid-container">
                            <div class="grid-item" id="explanation" v-bind:style="{ display: 'none' }">
                                <p>{{operationExplained}}</p>
                            </div>
                            <div class="grid-item" id="equation" v-html=equation v-bind:style="{ display: 'none' }">
                            </div>

                            <div class="operation grid-item" id="op1" v-bind:style="{ display: 'none' }">
                                <div class="grid-container">
                                    <div class="grid-item">
                                        <ion-item class="variable">
                                            <ion-label position="fixed">
                                                <div v-html=c></div>
                                            </ion-label>
                                            <ion-input v-model="op1Constant">
                                            </ion-input>
                                        </ion-item>
                                        <ion-item class="variable">
                                            <ion-label position="fixed">
                                                <div v-html=Ri></div>
                                            </ion-label>
                                            <ion-input v-model="op1Row">
                                            </ion-input>
                                        </ion-item>
                                    </div>
                                    <div class="grid-item">
                                        <ion-button id="op1Button" color="primary" fill="outline" size="small"
                                            @click="op1Function">
                                            Aplicar</ion-button>
                                    </div>
                                </div>
                            </div>

                            <div class="operation grid-item" id="op2" v-bind:style="{ display: 'none' }">
                                <div class="grid-container">
                                    <div class="grid-item">
                                        <ion-item class="variable">
                                            <ion-label position="fixed">
                                                <div v-html=Ri></div>
                                            </ion-label>
                                            <ion-input v-model="op2Row1">
                                            </ion-input>
                                        </ion-item>
                                        <ion-item class="variable">
                                            <ion-label position="fixed">
                                                <div v-html=Rj></div>
                                            </ion-label>
                                            <ion-input v-model="op2Row2">
                                            </ion-input>
                                        </ion-item>
                                    </div>
                                    <div class="grid-item">
                                        <ion-button id="op2Button" color="primary" fill="outline" size="small"
                                            @click="op2Function">
                                            Aplicar</ion-button>
                                    </div>
                                </div>
                            </div>

                            <div class="operation grid-item" id="op3" v-bind:style="{ display: 'none' }">
                                <div class="grid-container">
                                    <div class="grid-item">
                                        <ion-item class="variable">
                                            <ion-label position="fixed">
                                                <div v-html=Ri></div>
                                            </ion-label>
                                            <ion-input v-model="op3Row">
                                            </ion-input>
                                        </ion-item>
                                        <ion-item class="variable">
                                            <ion-label position="fixed">
                                                <div v-html=c></div>
                                            </ion-label>
                                            <ion-input v-model="op3Constant">
                                            </ion-input>
                                        </ion-item>
                                        <ion-item class="variable">
                                            <ion-label position="fixed">
                                                <div v-html=Rpivot></div>
                                            </ion-label>
                                            <ion-input v-model="op3PivotRow">
                                            </ion-input>
                                        </ion-item>
                                    </div>
                                    <div class="grid-item">
                                        <ion-button id="op2Button" color="primary" fill="outline" size="small"
                                            @click="op3Function">
                                            Aplicar</ion-button>
                                    </div>
                                </div>
                            </div>


                        </div>
                    </div>
                </div>
            </div>
        </ion-content>
    </ion-page>
</template>

<script lang="ts">
import { defineComponent, nextTick } from 'vue';
import {
    IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonSelect,
    IonSelectOption, IonInput, IonButton, IonLabel, IonItem
} from '@ionic/vue';
import katex from 'katex';
import mathjs, { string } from "mathjs";


function clone(obj: any): any {
    // Handle the 3 simple types, and null or undefined
    if (null == obj || "object" != typeof obj) return obj;

    // Handle Date
    if (obj instanceof Date) {
        var copy = new Date();
        copy.setTime(obj.getTime());
        return copy;
    }

    // Handle Array
    if (obj instanceof Array) {
        var copy2 = [];
        for (var i = 0, len = obj.length; i < len; i++) {
            copy2[i] = clone(obj[i]);
        }
        return copy2;
    }

    // Handle Object
    if (obj instanceof Object) {
        var copy3 = {};
        for (var attr in Object(obj)) {
            if (Object.prototype.hasOwnProperty.call(obj, attr)) (copy3 as any)[attr] = clone(obj[attr]);
        }
        return copy3;
    }

    throw new Error("Unable to copy obj! Its type isn't supported.");
}

export default defineComponent({
    name: 'OperacoesElementares',
    components: {
        IonButtons,
        IonContent,
        IonHeader,
        IonMenuButton,
        IonPage,
        IonTitle,
        IonToolbar,
        IonSelect,
        IonSelectOption,
        IonInput, IonButton, IonLabel, IonItem
    },
    setup() {
        const equation = katex.renderToString("c\\cdot R_i", {
            throwOnError: false
        });
        const Ri = katex.renderToString("R_i", {
            throwOnError: false
        });
        const Rj = katex.renderToString("R_j", {
            throwOnError: false
        });
        const Rpivot = katex.renderToString("R_{pivot}", {
            throwOnError: false
        });
        const c = katex.renderToString("c", {
            throwOnError: false
        });

        const evaluateMatrix = (matrix: string[][]) => {
            let result = [];
            for (let i = 0; i < matrix.length; i++) {
                let row = [];
                for (let j = 0; j < matrix[i].length; j++) {
                    row.push(mathjs.evaluate(matrix[i][j]));
                }
                result.push(row);
            }
            return result;
        }

        const addToUndoPile = async (matrix: string[][], undoPile: string[][][]) => {
            undoPile.push(matrix);
            return undoPile;
        }

        const addToRedoPile = async (matrix: string[][], redoPile: string[][][]) => {
            redoPile.push(matrix);
            return redoPile;
        }

        return { equation, Ri, c, Rj, Rpivot, evaluateMatrix, addToUndoPile, addToRedoPile };
    },
    data() {
        return {
            rows: 3,
            columns: 3,
            matrix: [['', '', ''], ['', '', ''], ['', '', '']],
            unknownsColumn: ['', '', ''],
            operationExplained: "Multiplica uma linha i por uma constante c",
            undoPile: [[['', '', ''], ['', '', ''], ['', '', '']]],
            redoPile: [[['', '', ''], ['', '', ''], ['', '', '']]],
            op1Constant: '',
            op1Row: '',
            op2Row1: '',
            op2Row2: '',
            op3Row: '',
            op3Constant: '',
            op3PivotRow: ''
        }
    },
    methods: {
        selectOperation(value: any) {
            var equation = document.getElementById("equation") as HTMLElement;
            var explanation = document.getElementById("explanation") as HTMLElement;
            equation.style.display = "block";
            explanation.style.display = "block";

            var op1 = document.getElementById("op1") as HTMLElement;
            var op2 = document.getElementById("op2") as HTMLElement;
            var op3 = document.getElementById("op3") as HTMLElement;
            if (value != "op1") {
                op1.style.display = "none";
            }
            if (value != "op2") {
                op2.style.display = "none";
            }
            if (value != "op3") {
                op3.style.display = "none";
            }

            if (value == "op1") {
                this.operationExplained = "Multiplica uma linha i por uma constante c";
                this.equation = katex.renderToString("c\\cdot R_i", {
                    throwOnError: false
                });
                op1.style.display = "block";
            } else if (value == "op2") {
                this.operationExplained = "Troca duas linhas i e j";
                this.equation = katex.renderToString("R_i \\leftrightarrow R_j", {
                    throwOnError: false
                });
                op2.style.display = "block";
            } else if (value == "op3") {
                this.operationExplained = "Soma a linha i uma constante c multiplicada pela linha pivô";
                this.equation = katex.renderToString("R_i \\leftarrow R_i + c\\cdot R_{pivot}", {
                    throwOnError: false
                });
                op3.style.display = "block";
            }
        },
        async op1Function() {
            if (this.op1Constant == '' || this.op1Row == '') {
                alert("Preencha todos os campos");
                return;
            }
            this.undoPile = await this.addToUndoPile(clone(this.matrix), this.undoPile);
            for (var i = 0; i < this.columns; i++) {
                this.matrix[+this.op1Row - 1][i] = String(+this.op1Constant * +this.matrix[+this.op1Row - 1][i]);
            }
        },
        async op2Function() {
            this.undoPile = await this.addToUndoPile(clone(this.matrix), this.undoPile);
            var aux = this.matrix[+this.op2Row1 - 1];
            this.matrix[+this.op2Row1 - 1] = this.matrix[+this.op2Row2 - 1];
            this.matrix[+this.op2Row2 - 1] = aux;
        },
        async op3Function() {
            this.undoPile = await this.addToUndoPile(clone(this.matrix), this.undoPile);
            for (var i = 0; i < this.columns; i++) {
                this.matrix[+this.op3Row - 1][i] = String(+this.matrix[+this.op3Row - 1][i] + +this.op3Constant * +this.matrix[+this.op3PivotRow - 1][i]);
            }
        },
        addDimension() {
            this.columns++;
            this.rows++;
            let newRow = [];
            for (let array in this.matrix) {
                this.matrix[array].push('');
            }
            for (let i = 0; i < this.columns; i++) {
                newRow.push('');
            }
            this.matrix.push(newRow);
            this.unknownsColumn.push('');
        },
        removeDimension() {
            this.columns--;
            this.rows--;
            for (let array in this.matrix) {
                this.matrix[array].pop();
            }
            this.matrix.pop();
            this.unknownsColumn.pop();
        },
        clearTable() {
            for (let i = 0; i < this.matrix.length; i++) {
                for (let j = 0; j < this.matrix[i].length; j++) {
                    this.matrix[i][j] = '';
                }
            }
        },
        textInput(event: any) {
            this.matrix[this.rows][this.columns] = event.target.value;
        },
        async undoAction() {
            if (this.undoPile.length > 1) {
                let lastAction = clone(this.undoPile.pop()) as string[][];
                this.redoPile = await this.addToRedoPile(clone(this.matrix), clone(this.redoPile));
                this.matrix = clone(lastAction);
            }
        },
        async redoAction() {
            if (this.redoPile.length > 1) {
                let lastAction = clone(this.redoPile.pop()) as string[][];
                this.undoPile = await this.addToUndoPile(clone(this.matrix), clone(this.undoPile));
                this.matrix = clone(lastAction);
            }
        },
    }
});



</script>
<style scoped>
#container {
    text-align: center;
    position: top;
    left: 0;
    right: 0;
    transform: translateY(5%);
}

#container strong {
    font-size: 20px;
    line-height: 26px;
}

#container p {
    font-size: 16px;
    line-height: 22px;
    color: #8c8c8c;
    margin: 0;
}

#container a {
    text-decoration: none;
}

.grid-container {
    display: grid;
    row-gap: 20px;
}

.table-wrapper {
    display: flex;
    grid-template-columns: 1fr 1fr;
    column-gap: 0px;
    row-gap: 1px;
}

.table-wrapper table {
    border-collapse: collapse;
    position: relative;
}

#matrix {
    text-align: center;
    position: top;
    left: 0;
    right: 0;
    transform: translateY(5%);
}

#matrixTable {
    text-align: center;
    position: top;
    margin-left: auto;
    left: 0;
    right: 0;
}

#unknownsTable {
    text-align: center;
    position: top;
    margin-left: 10px;
    margin-right: auto;
    left: 0;
    right: 0;
}

#matrixTable td {
    padding: 5px;
    width: 70px;
    height: 50px;
}

#unknownsTable td {
    padding: 5px 5px 0px 0px;
    width: 50px;
    height: 50px;
}

table:before,
table:after {
    content: '';
    height: 100%;
    position: absolute;
    border-color: rgb(156, 156, 156);
    border-style: solid;
    width: 10px;
    top: -1px;
}

table:before {
    left: -2px;
    border-width: 2px 0px 2px 2px;
}

table:after {
    right: -2px;
    border-width: 2px 2px 2px 0px;
}

#actionButtons {
    text-align: center;
    position: top;
    left: 0;
    right: 0;
}

.hr {
    border-bottom: 1px solid #575757;
    margin-left: auto;
    margin-right: auto;
    margin-top: 1%;
    margin-bottom: 1%;
    width: 80%;
    text-align: center;
}

ion-select {
    width: 80%;
    margin-left: auto;
    margin-right: auto;
}

ion-item {
    display: flex;
    width: 80%;
    min-width: 40%;
    position: center;
    grid-template-columns: 1fr 1fr;
    column-gap: 0px;
    margin-left: auto;
    margin-right: auto;
    --background: transparent;
}

.variable ion-label {
    text-align: center;
    border-collapse: collapse;
    margin-left: auto;
    margin-right: auto;
    position: relative;
}

.variable ion-input {
    text-align: center;
    border-collapse: collapse;
    margin-left: auto;
    margin-right: auto;
    position: relative;
}

h2 {
    font-weight: bold;
}

.alert-ios .alert-wrapper {
    max-width: unset !important;
    width: 100% !important;
}

.alert-md .alert-wrapper {
    max-width: unset !important;
    width: 100% !important;
}
</style>
  