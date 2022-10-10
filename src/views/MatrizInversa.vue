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
                            @click="removeDimension">-
                        </ion-button>
                        <ion-button id="clearTable" color="primary" fill="outline" size="small" @click="clearTable">
                            Limpar</ion-button>
                        <ion-button id="textInput" color="primary" fill="outline" size="small" @click="textInput">Texto
                        </ion-button>
                    </div>
                    <div id="tableInput" class="grid-item">
                        <table id="matrixTable">
                            <tr v-for="(row, index) in matrix" :key="index" v-bind:id="'row-'+index">
                                <td v-for="(cell, index2) in row" :key="index2" v-bind:id="'column-'+index2">
                                    <ion-input type="number" placeholder="0" v-model="matrix[index][index2]">
                                    </ion-input>
                                </td>
                            </tr>
                        </table>
                    </div>
                    <div id="result" class="grid-item">
                        <ion-button id="calculate" color="primary" fill="outline" size="small"
                            @click="calculateInverseMatrix">
                            Calcular</ion-button>
                    </div>
                    <div class="hr grid-item">
                    </div>
                    <div class="grid-item">
                        <ion-label>
                            <h2>Resultado</h2>
                        </ion-label>
                    </div>
                    <div id="tableInput" class="grid-item">
                        <table id="matrixTable">
                            <tr v-for="(row, index) in matrix" :key="index" v-bind:id="'row-'+index">
                                <td v-for="(cell, index2) in row" :key="index2" v-bind:id="'column-'+index2">
                                    <ion-input v-model="inverseMatrix[index][index2]" readonly>
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
    IonInput, IonButton, IonLabel, IonItem
} from '@ionic/vue';

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
        IonInput, IonButton, IonLabel,
    },
    data() {
        return {
            rows: 3,
            columns: 3,
            matrix: [['', '', ''], ['', '', ''], ['', '', '']],
            inverseMatrix: [['', '', ''], ['', '', ''], ['', '', '']],
        }
    },
    methods: {
        calculateInverseMatrix() {
            let matrix = this.matrix;
            let rows = this.rows;
            let columns = this.columns;
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

#matrixTable {
    text-align: center;
    position: top;
    margin-left: auto;
    margin-right: auto;
    left: 0;
    right: 0;
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
  