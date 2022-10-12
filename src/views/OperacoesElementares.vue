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
                    <div id="tableOptions" class="grid-item dimensoes">
                        <ion-label class="item-dimensoes">Dimensões</ion-label>
                        <ion-item class="item-dimensoes" fill="solid" ref="rowInput">
                            <ion-input type="number" @ionInput="validateRowInput" value="3">
                            </ion-input>
                            <ion-note slot="helper">Linhas</ion-note>
                            <ion-note slot="error">Valor inválido</ion-note>
                        </ion-item>
                        <ion-label class="item-dimensoes">x</ion-label>
                        <ion-item class="item-dimensoes" fill="solid" ref="columnInput">
                            <ion-input type="number" @ionInput="validateColumnInput" value="3">
                            </ion-input>
                            <ion-note slot="helper">Colunas</ion-note>
                            <ion-note slot="error">Valor inválido</ion-note>
                        </ion-item>
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
                        <ion-button id="clearTable" :disabled="isMatrixEmpty()" color="primary" fill="outline"
                            size="small" @click="clearTable">
                            Limpar tabela</ion-button>
                    </div>
                    <div class="hr grid-item">
                    </div>
                    <div class="grid-item">
                        <ion-label>
                            <h2>Selecionar operação</h2>
                        </ion-label>
                    </div>
                    <div class="grid-item">
                        <ion-select class="alerta-customizado" placeholder="Selecionar operação"
                            @ionChange="selectOperation($event.detail.value)">
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
import { defineComponent } from 'vue';
import {
    IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonSelect,
    IonSelectOption, IonInput, IonButton, IonLabel, IonItem, IonNote
} from '@ionic/vue';
import katex from 'katex';
import { create, all } from "mathjs";
//import { parse, Expression } from "algebra.js";
import nerdamer from "nerdamer/all";

function evaluateMatrix(matrix: any): any {
    let result = structuredClone(matrix);
    for (let i = 0; i < result.length; i++) {
        for (let j = 0; j < result[i].length; j++) {
            if (result[i][j] != '') {
                try {
                    result[i][j] = nerdamer(result[i][j]).text('fractions');
                }
                catch (e) {
                    console.log(e);
                }
            }
        }
    }
    return result;
}

function evaluateUnknownsMatrix(matrix: any): any {
    let result = structuredClone(matrix);
    for (let i = 0; i < result.length; i++) {
        if (result[i] != '') {
            try {
                result[i] = nerdamer(result[i]).text('fractions');
            }
            catch (e) {
                console.log(e);
            }
        }
    }
    return result;
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
        IonInput,
        IonButton,
        IonLabel,
        IonItem,
        IonNote
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

        return { equation, Ri, c, Rj, Rpivot };
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
            undoUnknownsPile: [['', '', '']],
            redoUnknownsPile: [['', '', '']],
            op1Constant: '',
            op1Row: '',
            op2Row1: '',
            op2Row2: '',
            op3Row: '',
            op3Constant: '',
            op3PivotRow: '',
        }
    },
    methods: {
        isMatrixEmpty(): boolean {
            for (let i = 0; i < this.matrix.length; i++) {
                for (let j = 0; j < this.matrix[i].length; j++) {
                    if (this.matrix[i][j] != '') {
                        return false;
                    }
                }
            }
            return true;
        },
        adjustColumns(newColumns: number) {
            if (newColumns > this.columns) {
                for (let array in this.matrix) {
                    for (let i = this.columns; i < newColumns; i++) {
                        this.matrix[array].push('');
                    }
                }
            }
            else {
                for (let array in this.matrix) {
                    for (let i = this.columns; i > newColumns; i--) {
                        this.matrix[array].pop();
                    }
                }
            }
            this.columns = newColumns;
        },
        adjustRows(newRows: number) {
            if (newRows > this.rows) {
                for (let i = 0; i < newRows - this.rows; i++) {
                    let newRow = [];
                    for (let j = 0; j < this.columns; j++) {
                        newRow.push('');
                    }
                    this.matrix.push(newRow);
                    this.unknownsColumn.push('');
                }
            }
            else {
                for (let i = 0; i < this.rows - newRows; i++) {
                    this.matrix.pop();
                    this.unknownsColumn.pop();
                }
            }
            this.rows = newRows;
        },
        validateInput(value: any) {
            if (value == '') {
                return false;
            }
            try {
                return isFinite(value) && value > 0;
            }
            catch (e) {
                return false;
            }
        },
        validateRowInput(ev: any) {
            const value = ev.target.value;

            (this.$refs as any).rowInput.$el.classList.remove('ion-valid');
            (this.$refs as any).rowInput.$el.classList.remove('ion-invalid');

            if (this.validateInput(value)) {
                (this.$refs as any).rowInput.$el.classList.add('ion-valid');
                this.adjustRows(value);
            } else {
                (this.$refs as any).rowInput.$el.classList.add('ion-invalid');
            }
        },
        validateColumnInput(ev: any) {
            const value = ev.target.value;

            (this.$refs as any).columnInput.$el.classList.remove('ion-valid');
            (this.$refs as any).columnInput.$el.classList.remove('ion-invalid');

            if (this.validateInput(value)) {
                (this.$refs as any).columnInput.$el.classList.add('ion-valid');
                this.adjustColumns(value);
            } else {
                (this.$refs as any).columnInput.$el.classList.add('ion-invalid');
            }
        },
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
            if (+this.op1Row > this.rows || +this.op1Row < 1) {
                alert("A linha escolhida não existe");
                return;
            }
            this.matrix = evaluateMatrix(this.matrix);
            this.unknownsColumn = evaluateUnknownsMatrix(this.unknownsColumn);
            this.op1Constant = nerdamer(this.op1Constant).text('fractions');
            this.undoPile.push(structuredClone(this.matrix));
            this.undoUnknownsPile.push(structuredClone(this.unknownsColumn));

            for (var i = 0; i < this.columns; i++) {
                let value = structuredClone(this.matrix[+this.op1Row - 1][i]);
                if (value == '') {
                    value = '0';
                }
                else {
                    this.matrix[+this.op1Row - 1][i] = nerdamer(value).multiply(this.op1Constant).text('fractions');
                }
            }

            let unknown = structuredClone(this.unknownsColumn[+this.op1Row - 1]);
            if (unknown == '') {
                unknown = '0';
            }
            else {
                this.unknownsColumn[+this.op1Row - 1] = nerdamer(unknown).multiply(this.op1Constant).text('fractions');
            }
        },
        async op2Function() {
            if (this.op2Row1 == '' || this.op2Row2 == '') {
                alert("Preencha todos os campos");
                return;
            }
            if (+this.op2Row1 > this.rows || +this.op2Row1 < 1 || +this.op2Row2 > this.rows || +this.op2Row2 < 1) {
                alert("A linha escolhida não existe");
                return;
            }
            this.matrix = evaluateMatrix(this.matrix);
            this.unknownsColumn = evaluateUnknownsMatrix(this.unknownsColumn);
            this.undoPile.push(structuredClone(this.matrix));
            this.undoUnknownsPile.push(structuredClone(this.unknownsColumn));

            var aux = this.matrix[+this.op2Row1 - 1];
            this.matrix[+this.op2Row1 - 1] = this.matrix[+this.op2Row2 - 1];
            this.matrix[+this.op2Row2 - 1] = aux;

            var unknownAux = this.unknownsColumn[+this.op2Row1 - 1];
            this.unknownsColumn[+this.op2Row1 - 1] = this.unknownsColumn[+this.op2Row2 - 1];
            this.unknownsColumn[+this.op2Row2 - 1] = unknownAux;
        },
        async op3Function() {
            if (this.op3PivotRow == '' || this.op3Row == '' || this.op3Constant == '') {
                alert("Preencha todos os campos");
                return;
            }
            if (+this.op3PivotRow > this.rows || +this.op3PivotRow < 1 || +this.op3Row > this.rows || +this.op3Row < 1) {
                alert("A linha escolhida não existe");
                return;
            }
            this.matrix = evaluateMatrix(this.matrix);
            this.unknownsColumn = evaluateUnknownsMatrix(this.unknownsColumn);
            this.op3Constant = nerdamer(this.op3Constant).text('fractions');
            this.undoPile.push(structuredClone(this.matrix));
            this.undoUnknownsPile.push(structuredClone(this.unknownsColumn));

            for (var i = 0; i < this.columns; i++) {
                let value = structuredClone(this.matrix[+this.op3Row - 1][i]);
                if (value == '') {
                    value = '0';
                }
                else {
                    this.matrix[+this.op3Row - 1][i] = nerdamer(value)
                        .add(nerdamer(this.matrix[+this.op3PivotRow - 1][i])
                            .multiply(this.op3Constant))
                        .text('fractions');
                }
            }

            let unknown = structuredClone(this.unknownsColumn[+this.op3Row - 1]);
            if (unknown == '') {
                unknown = '0';
            }
            else {
                this.unknownsColumn[+this.op3Row - 1] = nerdamer(unknown)
                    .add(nerdamer(this.unknownsColumn[+this.op3PivotRow - 1])
                        .multiply(this.op3Constant))
                    .text('fractions');
            }
        },
        clearTable() {
            for (let i = 0; i < this.matrix.length; i++) {
                for (let j = 0; j < this.matrix[i].length; j++) {
                    this.matrix[i][j] = '';
                }
            }
        },
        async undoAction() {
            if (this.undoPile.length > 1) {
                let lastAction = structuredClone(this.undoPile.pop()) as string[][];
                let lastUnknownsAction = structuredClone(this.undoUnknownsPile.pop()) as string[];
                this.redoUnknownsPile.push(structuredClone(this.unknownsColumn));
                this.redoPile.push(structuredClone(this.matrix));
                this.matrix = structuredClone(lastAction);
                this.unknownsColumn = structuredClone(lastUnknownsAction);
            }
        },
        async redoAction() {
            if (this.redoPile.length > 1) {
                let lastAction = structuredClone(this.redoPile.pop()) as string[][];
                let lastUnknownsAction = structuredClone(this.redoUnknownsPile.pop()) as string[];
                this.undoPile.push(structuredClone(this.matrix));
                this.undoUnknownsPile.push(structuredClone(this.unknownsColumn));
                this.matrix = structuredClone(lastAction);
                this.unknownsColumn = structuredClone(lastUnknownsAction);
            }
        },
    }
});



</script>
<style scoped>
.dimensoes {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
    margin-bottom: 10px;
}

.item-dimensoes {
    margin: 0 10px;
    padding-bottom: 20px;
}

ion-item.item-dimensoes {
    width: 10%;
    height: fit-content;
}

ion-note {
    font-size: 12px;
    position: fixed;
}

.item-dimensoes ion-input {
    width: 50%;
}

.alerta-customizado .alert-wrapper {
    background: #e5e5e5;
}

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
    width: 100px;
    height: 50px;
}

#unknownsTable td {
    padding: 5px 5px 0px 0px;
    width: 100px;
    height: 50px;
}

table:before,
table:after {
    content: '';
    height: 100%;
    position: absolute;
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

@media (prefers-color-scheme: light) {

    table:before,
    table:after {
        border-color: #428cff;
    }
}

@media (prefers-color-scheme: dark) {

    table:before,
    table:after {
        border-color: rgb(156, 156, 156);
    }
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

.variable {
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
  