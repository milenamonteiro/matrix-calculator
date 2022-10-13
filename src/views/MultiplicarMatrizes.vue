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
                            <ion-item class="item-dimensoes" fill="solid" ref="rowInput">
                                <ion-input type="number" class="inputNumber" @ionInput="validateRowInput" value="3">
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
                        <ion-button :disabled="isMatrixEmpty" id="clearTable" color="primary" fill="outline"
                            size="small" @click="clearTable">
                            Limpar</ion-button>
                    </div>

                    <div id="table2Buttons" class="grid-item">
                        <div id="table2Options" class="grid-item dimensoes">
                            <ion-label class="item-dimensoes">Dimensões</ion-label>
                            <ion-item class="item-dimensoes" fill="solid" ref="row2Input">
                                <ion-input type="number" class="inputNumber" @ionInput="validateRow2Input" value="3">
                                </ion-input>
                                <ion-note slot="helper">Linhas</ion-note>
                                <ion-note slot="error">Valor inválido</ion-note>
                            </ion-item>
                            <ion-label class="item-dimensoes">x</ion-label>
                            <ion-item class="item-dimensoes" fill="solid" ref="column2Input">
                                <ion-input type="number" @ionInput="validateColumn2Input" value="3">
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
                        <ion-button :disabled="isMatrixEmpty" id="clearTable" color="primary" fill="outline"
                            size="small" @click="clearTable">
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
                            <tr v-for="(row, index) in multipliedMatrix" :key="index" v-bind:id="'row-'+index">
                                <td v-for="(cell, index2) in row" :key="index2" v-bind:id="'column-'+index2">
                                    <ion-input v-model="multipliedMatrix[index][index2]" readonly>
                                    </ion-input>
                                </td>
                            </tr>
                        </table>
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
    IonInput, IonButton, IonLabel
} from '@ionic/vue';
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
        IonInput, IonButton, IonLabel
    },
    data() {
        return {
            rows: 3,
            columns: 3,
            matrix1: [['', '', ''], ['', '', ''], ['', '', '']],
            matrix2: [['', '', ''], ['', '', ''], ['', '', '']],
            multipliedMatrix: [['', '', ''], ['', '', ''], ['', '', '']]
        }
    },
    methods: {
        multiplyMatrixes() {
            let result; // nxn
            for (let i = 0; i < this.rows; i++) {
                for (let j = 0; j < this.columns; j++) {
                    result = 0;
                    for (let k = 0; k < this.columns; k++) {
                        result += nerdamer(this.matrix1[i][k]) * nerdamer(this.matrix2[k][j]);
                    }
                    this.multipliedMatrix[i][j] = String(result);
                }
            }
            return null;
            /**
             * input A and B, both n by n matrices
                initialize C to be an n by n matrix of all zeros
                for i from 1 to n:
                    for j from 1 to n:
                        for k from 1 to n:
                            C[i][j] = C[i][j] + A[i][k]*B[k][j]
                output C (as A*B)
             */
        },
        adjustColumns(newColumns: number) {
            if (newColumns > this.columns) {
                for (let array in this.matrix1) {
                    for (let i = this.columns; i < newColumns; i++) {
                        this.matrix1[array].push('');
                    }
                }
            }
            else {
                for (let array in this.matrix1) {
                    for (let i = this.columns; i > newColumns; i--) {
                        this.matrix1[array].pop();
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
                    this.matrix1.push(newRow);
                }
            }
            else {
                for (let i = 0; i < this.rows - newRows; i++) {
                    this.matrix1.pop();
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
        validateRow2Input(ev: any) {
            const value = ev.target.value;

            (this.$refs as any).row2Input.$el.classList.remove('ion-valid');
            (this.$refs as any).row2Input.$el.classList.remove('ion-invalid');

            if (this.validateInput(value)) {
                (this.$refs as any).row2Input.$el.classList.add('ion-valid');
                this.adjustRows(value);
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
                this.adjustColumns(value);
            } else {
                (this.$refs as any).column2Input.$el.classList.add('ion-invalid');
            }
        },
        isMatrixEmpty(): boolean {
            for (let i = 0; i < this.matrix1.length; i++) {
                for (let j = 0; j < this.matrix1[i].length; j++) {
                    if (this.matrix1[i][j] != '') {
                        return false;
                    }
                }
            }
            return true;
        },
        clearTable() {
            for (let i = 0; i < this.matrix1.length; i++) {
                for (let j = 0; j < this.matrix1[i].length; j++) {
                    this.matrix1[i][j] = '';
                }
            }
        },
        textInput(event: any) {
            this.matrix1[this.rows][this.columns] = event.target.value;
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
  