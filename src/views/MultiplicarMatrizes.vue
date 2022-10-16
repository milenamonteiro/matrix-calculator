<template>
    <ion-page>
        <ion-header :translucent="true">
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-menu-button color="primary"></ion-menu-button>
                </ion-buttons>
                <ion-title>Multiplicação</ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content :fullscreen="true">
            <ion-header collapse="condense">
                <ion-toolbar>
                    <ion-title size="large">Multiplicação</ion-title>
                </ion-toolbar>
            </ion-header>

            <div id="container">
                <strong class="capitalize">Multiplicar Matrizes</strong>
                <p>Insira os valores na matriz</p>

                <div id="matrix" class="grid-container">
                    <div id="tableButtons" class="grid-item">
                        <div id="tableOptions" class="grid-item dimensoes">
                            <ion-label class="item-dimensoes">Dimensões</ion-label>
                            <ion-item class="item-dimensoes" fill="solid" ref="row1Input">
                                <ion-input @ionInput="validateRowInput" @ionBlur="markRow1Touched" value="3">
                                </ion-input>
                                <ion-note slot="helper">Linhas</ion-note>
                                <ion-note slot="error">Valor inválido</ion-note>
                            </ion-item>
                            <ion-label class="item-dimensoes">x</ion-label>
                            <ion-item class="item-dimensoes" fill="solid" ref="column1Input">
                                <ion-input @ionInput="validateColumnInput" @ionBlur="markColumn1Touched"
                                    v-model="tempColumns1">
                                </ion-input>
                                <ion-note slot="helper">Colunas</ion-note>
                                <ion-note slot="error">Valor inválido</ion-note>
                            </ion-item>
                        </div>
                    </div>
                    <div id="tableInput" class="grid-item">
                        <table id="matrixTable">
                            <tr v-for="(row, index) in matrix1" :key="index" v-bind:id="'row-'+index">
                                <td v-for="(cell, index2) in row" :key="index2" v-bind:id="'column-'+index2">
                                    <ion-input placeholder="0" v-model="matrix1[index][index2]">
                                    </ion-input>
                                </td>
                            </tr>
                        </table>
                    </div>
                    <div class="grid-item">
                        <ion-button :disabled="isMatrixEmpty(matrix1)" id="clearTable" color="primary" fill="outline"
                            size="small" @click="clearTable(matrix1)">
                            Limpar</ion-button>
                    </div>

                    <div id="table2Buttons" class="grid-item">
                        <div id="table2Options" class="grid-item dimensoes">
                            <ion-label class="item-dimensoes">Dimensões</ion-label>
                            <ion-item class="item-dimensoes" fill="solid" ref="row2Input">
                                <ion-input @ionInput="validateRow2Input" @ionBlur="markRow2Touched" v-model="tempRows2">
                                </ion-input>
                                <ion-note slot="helper">Linhas</ion-note>
                                <ion-note slot="error">Valor inválido</ion-note>
                            </ion-item>
                            <ion-label class="item-dimensoes">x</ion-label>
                            <ion-item class="item-dimensoes" fill="solid" ref="column2Input">
                                <ion-input @ionInput="validateColumn2Input" @ionBlur="markColumn2Touched" value="3">
                                </ion-input>
                                <ion-note slot="helper">Colunas</ion-note>
                                <ion-note slot="error">Valor inválido</ion-note>
                            </ion-item>
                        </div>
                    </div>
                    <div id="table2Input" class="grid-item">
                        <table id="matrix2Table">
                            <tr v-for="(row, index) in matrix2" :key="index" v-bind:id="'row-'+index">
                                <td v-for="(cell, index2) in row" :key="index2" v-bind:id="'column-'+index2">
                                    <ion-input placeholder="0" v-model="matrix2[index][index2]">
                                    </ion-input>
                                </td>
                            </tr>
                        </table>
                    </div>
                    <div class="grid-item">
                        <ion-button :disabled="isMatrixEmpty(matrix2)" id="clearTable" color="primary" fill="outline"
                            size="small" @click="clearTable(matrix2)">
                            Limpar</ion-button>
                    </div>
                    <div id="result" class="grid-item">
                        <ion-button id="calculate" color="primary" fill="outline" size="small"
                            @click="multiplyMatrixes">
                            Calcular</ion-button>
                    </div>
                    <div class="hr grid-item">
                    </div>
                    <div class="grid-item">
                        <ion-label>
                            <h2>Resultado</h2>
                        </ion-label>
                    </div>
                    <div id="multipliedMatrixTable" class="grid-item">
                        <table id="multipliedMatrixTable">
                            <tr v-for="(row, index) in multipliedMatrix" :key="index" v-bind:id="'row3-'+index">
                                <td v-for="(cell, index2) in row" :key="index2" v-bind:id="'column3-'+index2">
                                    <ion-input v-model="multipliedMatrix[index][index2]" readonly>
                                    </ion-input>
                                </td>
                            </tr>
                        </table>
                    </div>
                    <div class="grid-item">
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
    IonInput, IonButton, IonLabel, IonItem, IonNote
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
    name: 'MultiplicarMatrizes',
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
        IonItem,
        IonNote
    },
    setup() {
        const c = katex.renderToString("c", {
            throwOnError: false
        });

        return { c };
    },
    data() {
        return {
            rows1: 3,
            columns1: 3,
            rows2: 3,
            columns2: 3,
            tempColumns1: 3,
            tempRows2: 3,
            matrix1: [['', '', ''], ['', '', ''], ['', '', '']],
            matrix2: [['', '', ''], ['', '', ''], ['', '', '']],
            multipliedMatrix: [['', '', ''], ['', '', ''], ['', '', '']]
        }
    },
    methods: {
        multiplyMatrixes() {
            let matrix1 = evaluateMatrix(this.matrix1);
            let matrix2 = evaluateMatrix(this.matrix2);
            let result = Array(this.rows1).fill('').map(() => Array(this.columns2).fill(''));
            for (let i = 0; i < matrix1.length; i++) {
                result[i] = [];
                for (let j = 0; j < matrix2[0].length; j++) {
                    let sum = nerdamer('0');
                    for (let k = 0; k < matrix1[0].length; k++) {
                        sum = sum.add(nerdamer(matrix1[i][k]).multiply(matrix2[k][j]));
                    }
                    result[i][j] = sum;
                }
            }
            this.multipliedMatrix = result;
        },
        adjustColumns(matrix: string[][], oldColumns: number, newColumns: number) {
            if (newColumns > oldColumns) {
                for (let array in matrix) {
                    for (let i = oldColumns; i < newColumns; i++) {
                        matrix[array].push('');
                    }
                }
            }
            else {
                for (let array in matrix) {
                    for (let i = oldColumns; i > newColumns; i--) {
                        matrix[array].pop();
                    }
                }
            }
            oldColumns = newColumns;
        },
        adjustRows(matrix: string[][], columns: number, oldRows: number, newRows: number) {
            if (newRows > oldRows) {
                for (let i = 0; i < newRows - oldRows; i++) {
                    let newRow = [];
                    for (let j = 0; j < columns; j++) {
                        newRow.push('');
                    }
                    matrix.push(newRow);
                }
            }
            else {
                for (let i = 0; i < oldRows - newRows; i++) {
                    matrix.pop();
                }
            }
            oldRows = newRows;
        },
        validateInput(value: any) {

            if (value == '') {
                return false;
            }
            try {
                return isFinite(value) && value > 0 && !isNaN(value);
            }
            catch (e) {
                return false;
            }
        },
        validateRowInput(ev: any) {
            const value = ev.target.value;

            (this.$refs as any).row1Input.$el.classList.remove('ion-valid');
            (this.$refs as any).row1Input.$el.classList.remove('ion-invalid');

            if (this.validateInput(value)) {
                (this.$refs as any).row1Input.$el.classList.add('ion-valid');
                this.adjustRows(this.matrix1, this.columns1, this.rows1, value);
                this.rows1 = value;
            } else {
                (this.$refs as any).row1Input.$el.classList.add('ion-invalid');
            }
        },
        validateColumnInput(ev: any) {
            const value = ev.target.value;

            (this.$refs.column1Input as any).$el.classList.remove('ion-valid');
            (this.$refs.column1Input as any).$el.classList.remove('ion-invalid');


            if (this.validateInput(value)) {
                if (value != this.tempRows2) {
                    alert('O número de colunas da primeira matriz deve ser igual ao número de linhas da segunda matriz.');
                    (this.$refs as any).column1Input.$el.classList.add('ion-invalid');
                } else {
                    (this.$refs as any).column1Input.$el.classList.add('ion-valid');
                    this.adjustColumns(this.matrix1, this.columns1, value);
                    this.columns1 = value;
                    if (this.rows2 != value) {
                        this.adjustRows(this.matrix2, this.columns2, this.rows2, value);
                        this.rows2 = value;
                        (this.$refs.row2Input as any).$el.classList.remove('ion-invalid');
                    }
                }
            } else {
                (this.$refs as any).column1Input.$el.classList.add('ion-invalid');
            }
        },
        validateRow2Input(ev: any) {
            const value = ev.target.value;

            (this.$refs as any).row2Input.$el.classList.remove('ion-valid');
            (this.$refs as any).row2Input.$el.classList.remove('ion-invalid');

            if (this.validateInput(value)) {
                if (value != this.tempColumns1) {
                    alert('O número de colunas da primeira matriz deve ser igual ao número de linhas da segunda matriz.');
                    (this.$refs as any).row2Input.$el.classList.add('ion-invalid');
                }
                else {
                    (this.$refs as any).row2Input.$el.classList.add('ion-valid');
                    this.adjustRows(this.matrix2, this.columns2, this.rows2, value);
                    this.rows2 = value;
                    if (this.columns1 != value) {
                        this.adjustColumns(this.matrix1, this.columns1, value);
                        this.columns1 = value;
                        (this.$refs.column1Input as any).$el.classList.remove('ion-invalid');
                    }
                }
            } else {
                (this.$refs as any).row2Input.$el.classList.add('ion-invalid');
            }
        },
        validateColumn2Input(ev: any) {
            const value = ev.target.value;

            (this.$refs as any).column2Input.$el.classList.remove('ion-valid');
            (this.$refs as any).column2Input.$el.classList.remove('ion-invalid');

            if (this.validateInput(value)) {
                (this.$refs as any).column2Input.$el.classList.add('ion-valid');
                this.adjustColumns(this.matrix2, this.columns2, value);
                this.columns2 = value;
            } else {
                (this.$refs as any).column2Input.$el.classList.add('ion-invalid');
            }
        },
        markRow1Touched() {
            (this.$refs as any).row1Input.$el.classList.remove('ion-valid');
            (this.$refs as any).row1Input.$el.classList.add('ion-touched');
        },
        markColumn1Touched() {
            (this.$refs as any).column1Input.$el.classList.remove('ion-valid');
            (this.$refs as any).column1Input.$el.classList.add('ion-touched');
        },
        markRow2Touched() {
            (this.$refs as any).row2Input.$el.classList.remove('ion-valid');
            (this.$refs as any).row2Input.$el.classList.add('ion-touched');
        },
        markColumn2Touched() {
            (this.$refs as any).column2Input.$el.classList.remove('ion-valid');
            (this.$refs as any).column2Input.$el.classList.add('ion-touched');
        },
        isMatrixEmpty(matrix: string[][]): boolean {
            for (let i = 0; i < matrix.length; i++) {
                for (let j = 0; j < matrix[i].length; j++) {
                    if (matrix[i][j] != '') {
                        return false;
                    }
                }
            }
            return true;
        },
        clearTable(matrix: string[][]) {
            for (let i = 0; i < matrix.length; i++) {
                for (let j = 0; j < matrix[i].length; j++) {
                    matrix[i][j] = '';
                }
            }
        }
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


@media only screen and (max-width: 600px) {

    /* For mobile phones: */
    ion-item.item-dimensoes {
        width: 15%;
    }
}

ion-note {
    font-size: 12px;
    position: fixed;
}

.item-dimensoes ion-input {
    width: 50%;
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

#matrix {
    text-align: center;
    position: top;
    left: 0;
    right: 0;
    transform: translateY(5%);
}

#matrixTable,
#matrix2Table,
#multipliedMatrixTable {
    text-align: center;
    position: relative;
    margin-left: auto;
    margin-right: auto;
    left: 0;
    right: 0;
}

#matrixTable td,
#matrix2Table td,
#multipliedMatrixTable td {
    padding: 5px;
    width: 100px;
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

.hr {
    border-bottom: 1px solid #575757;
    margin-left: auto;
    margin-right: auto;
    margin-top: 1%;
    margin-bottom: 1%;
    width: 80%;
    text-align: center;
}

h2 {
    font-weight: bold;
}


ion-input[type="number"]::-webkit-outer-spin-button,
ion-input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
    appearance: none !important;
    -webkit-appearance: none !important;
    margin: 0 !important;
    -moz-appearance: textfield !important;
}

ion-input[type="number"],
input[type="number"] {
    appearance: none !important;
    -webkit-appearance: none !important;
    margin: 0 !important;
    -moz-appearance: textfield !important;
}
</style>
  