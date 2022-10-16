<template>
    <ion-page>
        <ion-header :translucent="true">
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-menu-button color="primary"></ion-menu-button>
                </ion-buttons>
                <ion-title>Matriz Inversa</ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content :fullscreen="true">
            <ion-header collapse="condense">
                <ion-toolbar>
                    <ion-title size="large">Matriz Inversa</ion-title>
                </ion-toolbar>
            </ion-header>

            <div id="container">
                <strong class="capitalize">Matriz Inversa</strong>
                <p>Insira os valores na matriz</p>

                <div id="matrix" class="grid-container">
                    <div id="tableButtons" class="grid-item">
                        <ion-button id="addDimension" color="primary" fill="outline" size="small" @click="addDimension">
                            +
                        </ion-button>
                        <ion-button id="removeDimension" color="primary" fill="outline" size="small"
                            @click="removeDimension">–
                        </ion-button>
                        <ion-button :disabled="isMatrixEmpty" id="clearTable" color="primary" fill="outline"
                            size="small" @click="clearTable">
                            Limpar</ion-button>
                    </div>
                    <div id="tableInput" class="grid-item table-wrapper">
                        <table id="matrixTable">
                            <tr v-for="(row, index) in matrix" :key="index" v-bind:id="'row-'+index">
                                <td v-for="(cell, index2) in row" :key="index2" v-bind:id="'column-'+index2">
                                    <ion-input placeholder="0" v-model="matrix[index][index2]">
                                    </ion-input>
                                </td>
                            </tr>
                        </table>
                        <table id="identityTable">
                            <tbody>
                                <tr v-for="(row, index) in identity" :key="index" v-bind:id="'row2-'+index">
                                    <td v-for="(cell, index2) in row" :key="index2" v-bind:id="'column2-'+index2">
                                        <ion-input placeholder="0" v-model="identity[index][index2]">
                                        </ion-input>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
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
                            Limpar matrizes</ion-button>
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
                                        <ion-button id="op3Button" color="primary" fill="outline" size="small"
                                            @click="op3Function">
                                            Aplicar</ion-button>
                                    </div>
                                </div>
                                <div class="grid-item">
                                </div>
                            </div>
                        </div>
                        <div class="grid-item">
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
    IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar,
    IonInput, IonButton, IonLabel, IonSelect, IonSelectOption, IonItem
} from '@ionic/vue';
import nerdamer from "nerdamer/all";
import katex from 'katex';

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

export default defineComponent({
    name: 'MatrizInversa',
    components: {
        IonButtons,
        IonContent,
        IonHeader,
        IonMenuButton,
        IonPage,
        IonTitle,
        IonToolbar,
        IonInput,
        IonButton,
        IonLabel,
        IonSelect,
        IonSelectOption,
        IonItem
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
            identity: [['1', '0', '0'], ['0', '1', '0'], ['0', '0', '1']],
            operationExplained: "Multiplica uma linha i por uma constante c",
            undoPile: [[['', '', ''], ['', '', ''], ['', '', '']]],
            redoPile: [[['', '', ''], ['', '', ''], ['', '', '']]],
            undoIdentityPile: [[['', '', ''], ['', '', ''], ['', '', '']]],
            redoIdentityPile: [[['', '', ''], ['', '', ''], ['', '', '']]],
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
            this.identity = evaluateMatrix(this.identity);
            this.op1Constant = nerdamer(this.op1Constant).text('fractions');
            this.undoPile.push(structuredClone(this.matrix));
            this.undoIdentityPile.push(structuredClone(this.identity));

            for (var i = 0; i < this.columns; i++) {
                let value = structuredClone(this.matrix[+this.op1Row - 1][i]);
                let value2 = structuredClone(this.identity[+this.op1Row - 1][i]);
                if (value == '') {
                    value = '0';
                }
                else {
                    this.matrix[+this.op1Row - 1][i] = nerdamer(value).multiply(this.op1Constant).text('fractions');
                }
                this.identity[+this.op1Row - 1][i] = nerdamer(value2).multiply(this.op1Constant).text('fractions');
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
            this.identity = evaluateMatrix(this.identity);
            this.undoPile.push(structuredClone(this.matrix));
            this.undoIdentityPile.push(structuredClone(this.identity));

            var aux = this.matrix[+this.op2Row1 - 1];
            this.matrix[+this.op2Row1 - 1] = this.matrix[+this.op2Row2 - 1];
            this.matrix[+this.op2Row2 - 1] = aux;

            var unknownAux = this.identity[+this.op2Row1 - 1];
            this.identity[+this.op2Row1 - 1] = this.identity[+this.op2Row2 - 1];
            this.identity[+this.op2Row2 - 1] = unknownAux;
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
            this.identity = evaluateMatrix(this.identity);
            this.op3Constant = nerdamer(this.op3Constant).text('fractions');
            this.undoPile.push(structuredClone(this.matrix));
            this.undoIdentityPile.push(structuredClone(this.identity));

            for (var i = 0; i < this.columns; i++) {
                let value = structuredClone(this.matrix[+this.op3Row - 1][i]);
                let value2 = structuredClone(this.identity[+this.op3Row - 1][i]);
                if (value == '') {
                    value = '0';
                }
                else {
                    this.matrix[+this.op3Row - 1][i] = nerdamer(value)
                        .add(nerdamer(this.matrix[+this.op3PivotRow - 1][i])
                            .multiply(this.op3Constant))
                        .text('fractions');
                }
                this.identity[+this.op3Row - 1][i] = nerdamer(value2)
                    .add(nerdamer(this.identity[+this.op3PivotRow - 1][i])
                        .multiply(this.op3Constant))
                    .text('fractions');
            }

            let unknown = structuredClone(this.identity[+this.op3Row - 1]);
            if (unknown == '') {
                unknown = '0';
            }
            else {
                this.identity[+this.op3Row - 1] = nerdamer(unknown)
                    .add(nerdamer(this.identity[+this.op3PivotRow - 1])
                        .multiply(this.op3Constant))
                    .text('fractions');
            }
        },
        isMatrixEmpty(): boolean {
            for (let i = 0; i < this.matrix.length; i++) {
                for (let j = 0; j < this.matrix[i].length; j++) {
                    if (this.matrix[i][j] != '') {
                        return false;
                    }
                    if (i == j) {
                        if (this.identity[i][j] != '1') {
                            return false;
                        }
                    }
                    else {
                        if (this.identity[i][j] != '0') {
                            return false;
                        }
                    }
                }
            }
            return true;
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
            let newIdentityRow = [];
            for (let array in this.identity) {
                this.identity[array].push('0');
            }
            for (let i = 0; i < this.columns; i++) {
                if (i == this.columns - 1) {
                    newIdentityRow.push('1');
                }
                else {
                    newIdentityRow.push('0');
                }
            }
            this.identity.push(newIdentityRow);
        },
        removeDimension() {
            this.columns--;
            this.rows--;
            for (let array in this.matrix) {
                this.matrix[array].pop();
                this.identity[array].pop();
            }
            this.matrix.pop();
            this.identity.pop();
        },
        clearTable() {
            this.undoPile.push(structuredClone(this.matrix));
            this.undoIdentityPile.push(structuredClone(this.identity));
            for (let i = 0; i < this.matrix.length; i++) {
                for (let j = 0; j < this.matrix[i].length; j++) {
                    this.matrix[i][j] = '';
                    if (i == j) {
                        this.identity[i][j] = '1';
                    }
                    else {
                        this.identity[i][j] = '0';
                    }
                }
            }
        },
        async undoAction() {
            if (this.undoPile.length > 1) {
                let lastAction = structuredClone(this.undoPile.pop()) as string[][];
                let lastUnknownsAction = structuredClone(this.undoIdentityPile.pop()) as string[];
                if (!this.isMatrixEmpty()) {
                    this.redoPile.push(structuredClone(this.matrix));
                    this.redoIdentityPile.push(structuredClone(this.identity));
                }
                this.matrix = structuredClone(lastAction);
                this.identity = structuredClone(lastUnknownsAction);
            }
        },
        async redoAction() {
            if (this.redoPile.length > 1) {
                let lastAction = structuredClone(this.redoPile.pop()) as string[][];
                let lastUnknownsAction = structuredClone(this.redoIdentityPile.pop()) as string[];
                if (!this.isMatrixEmpty()) {
                    this.undoPile.push(structuredClone(this.matrix));
                    this.undoIdentityPile.push(structuredClone(this.identity));
                }
                this.matrix = structuredClone(lastAction);
                this.identity = structuredClone(lastUnknownsAction);
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

.table-wrapper {
    display: flex;
    flex-direction: row;
    grid-template-columns: 1fr 1fr;
    column-gap: 0px;
    row-gap: 0px;
    margin-right: 10px;
    margin-left: 10px;
}

.table-wrapper table {
    border-collapse: collapse;
    position: relative;
    width: 100%;
}

.grid-container {
    display: grid;
    row-gap: 20px;
}

#matrix {
    text-align: center;
    position: top;
    left: 0;
    right: 0;
    transform: translateY(5%);
}

#inverseMatrixTable,
#matrixTable,
#identityTable {
    text-align: center;
    position: relative;
    margin-left: auto;
    margin-right: auto;
    left: 0;
    right: 0;
    width: 100%;
}

#identityTable td {
    padding: 5px 5px 0px 0px;
    height: 50px;
}

#inverseMatrixTable td,
#matrixTable td {
    padding: 5px;
    height: 50px;
}

#actionButtons {
    text-align: center;
    position: top;
    left: 0;
    right: 0;
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
    left: 2px;
    border-width: 2px 0px 2px 2px;
}

table:after {
    right: 2px;
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
    width: 30%;
    position: center;
    grid-template-columns: 1fr 1fr;
    column-gap: 0px;
    margin-left: auto;
    margin-right: auto;
    --background: transparent;
}

.variable ion-label {
    text-align: center;
    width: fit-content;
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

@media only screen and (max-width: 700px) {

    /* For mobile phones: */
    .variable {
        width: 80%;
    }
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
  