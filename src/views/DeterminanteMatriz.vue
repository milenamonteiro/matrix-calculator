<template>
    <ion-page>
        <ion-header :translucent="true">
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-menu-button color="primary"></ion-menu-button>
                </ion-buttons>
                <ion-title>Determinante</ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content :fullscreen="true">
            <ion-header collapse="condense">
                <ion-toolbar>
                    <ion-title size="large">Determinante</ion-title>
                </ion-toolbar>
            </ion-header>

            <div id="container">
                <strong class="capitalize">Calcular o determinante</strong>
                <p>Insira os valores na matriz</p>

                <div id="matrix" class="grid-container">
                    <div id="tableButtons" class="grid-item">
                        <ion-button id="addDimension" color="primary" fill="outline" size="small" @click="addDimension">
                            +
                        </ion-button>
                        <ion-button id="removeDimension" color="primary" fill="outline" size="small"
                            @click="removeDimension">–
                        </ion-button>
                        <ion-button :disabled="isMatrixEmpty()" id="clearTable" color="primary" fill="outline"
                            size="small" @click="clearTable">
                            Limpar</ion-button>
                    </div>
                    <div id="tableInput" class="grid-item">
                        <table id="matrixTable">
                            <tr v-for="(row, index) in matrix" :key="index" v-bind:id="'row-'+index">
                                <td v-for="(cell, index2) in row" :key="index2" v-bind:id="'column-'+index2">
                                    <ion-input placeholder="0" v-model="matrix[index][index2]">
                                    </ion-input>
                                </td>
                            </tr>
                        </table>
                    </div>
                    <div id="result" class="grid-item">
                        <ion-button id="calculate" color="primary" fill="outline" size="small"
                            @click="calculateDeterminant">
                            Calcular</ion-button>
                    </div>
                    <div class="hr grid-item">
                    </div>
                    <div class="grid-item">
                        <ion-label>
                            <h2>Resultado</h2>
                        </ion-label>
                    </div>
                    <div class="grid-item">
                        <ion-label>
                            <h2>Determinante: {{resultDeterminant}}</h2>
                        </ion-label>
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
    name: 'DeterminanteMatriz',
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
            matrix: [['2', '3', '4'], ['5', '6', '7'], ['3', '4', '8']],
            resultDeterminant: ''
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
        calculateDeterminant() {
            if (this.isMatrixEmpty()) {
                this.resultDeterminant = 'Matriz vazia';
                return;
            }

            let matrix = evaluateMatrix(this.matrix);

            function echelonForm(): number {
                let multiplier = 1;
                let factor: number;
                for (let i = 0; i < matrix.length - 1; i++) {
                    let j = matrix.length - 1;
                    while (j != i) {
                        if (matrix[j][i] != '0') {
                            try {
                                factor = nerdamer(matrix[j][i]).divide(matrix[j - 1][i]).text('fractions');
                            }
                            catch (e) {
                                for (let x = 0; x < matrix.length; x++) {
                                    let temp = structuredClone(matrix[j][x]);
                                    matrix[j][x] = structuredClone(matrix[j - 1][x]);
                                    matrix[j - 1][x] = structuredClone(temp);
                                    multiplier *= -1;
                                }
                                continue;
                            }
                            for (let k = 0; k < matrix.length; k++) {
                                matrix[j][k] = nerdamer(matrix[j][k]).subtract(nerdamer(matrix[j - 1][k]).multiply(factor)).text('fractions');
                                console.log(matrix[j][k]);
                            }
                        }
                        j--;
                    }
                }
                return multiplier;
            }
            let multiplier = echelonForm();
            let determinant = nerdamer(1);
            for (let i = 0; i < matrix.length; i++) {
                if (matrix[i][i] == '') {
                    matrix[i][i] = 0;
                }
                try {
                    determinant = nerdamer(matrix[i][i]).multiply(determinant);
                }
                catch (e) {
                    console.log(e);
                }
            }
            this.resultDeterminant = nerdamer(determinant).multiply(multiplier).text('fractions');
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
        },
        removeDimension() {
            this.columns--;
            this.rows--;
            for (let array in this.matrix) {
                this.matrix[array].pop();
            }
            this.matrix.pop();
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
        }
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

#matrix {
    text-align: center;
    position: top;
    left: 0;
    right: 0;
    transform: translateY(5%);
}

#inverseMatrixTable,
#matrixTable {
    text-align: center;
    position: relative;
    margin-left: auto;
    margin-right: auto;
    left: 0;
    right: 0;
}

#inverseMatrixTable td,
#matrixTable td {
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

ion-select {
    width: 80%;
    margin-left: auto;
    margin-right: auto;
}

ion-item {
    width: 20%;
    margin-left: auto;
    margin-right: auto;
    --background: transparent;
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
  