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
                        <table id="matrixTable">
                            <tr v-for="(row, index) in matrix" :key="index" v-bind:id="'row-'+index">
                                <td v-for="(cell, index2) in row" :key="index2" v-bind:id="'column-'+index2">
                                    <ion-input type="number" placeholder="0" v-model="matrix[index][index2]"
                                        @keypress="numberOnlyValidation($event)">
                                    </ion-input>
                                </td>
                            </tr>
                        </table>
                    </div>
                    <div id="actionButtons" class="grid-item">
                        <ion-button id="undo" color="primary" fill="outline" size="small" @click="undoAction">Desfazer
                        </ion-button>
                        <ion-button id="redo" color="primary" fill="outline" size="small" @click="redoAction">Refazer
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
                                        <ion-item>
                                            <ion-label position="fixed">
                                                <div v-html=c></div>
                                            </ion-label>
                                            <ion-input type="number" v-model="op1Constant"
                                                @keypress="numberOnlyValidation($event)"></ion-input>
                                        </ion-item>
                                        <ion-item>
                                            <ion-label position="fixed">
                                                <div v-html=Ri></div>
                                            </ion-label>
                                            <ion-input type="number" v-model="op1Row"
                                                @keypress="numberOnlyValidation($event)">
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
                                        <ion-item>
                                            <ion-label position="fixed">
                                                <div v-html=Ri></div>
                                            </ion-label>
                                            <ion-input type="number" v-model="op2Row1"
                                                @keypress="numberOnlyValidation($event)"></ion-input>
                                        </ion-item>
                                        <ion-item>
                                            <ion-label position="fixed">
                                                <div v-html=Rj></div>
                                            </ion-label>
                                            <ion-input type="number" v-model="op2Row2"
                                                @keypress="numberOnlyValidation($event)"></ion-input>
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
                                        <ion-item>
                                            <ion-label position="fixed">
                                                <div v-html=Ri></div>
                                            </ion-label>
                                            <ion-input type="number" v-model="op3Row"
                                                @keypress="numberOnlyValidation($event)"></ion-input>
                                        </ion-item>
                                        <ion-item>
                                            <ion-label position="fixed">
                                                <div v-html=c></div>
                                            </ion-label>
                                            <ion-input type="number" v-model="op3Constant"
                                                @keypress="numberOnlyValidation($event)"></ion-input>
                                        </ion-item>
                                        <ion-item>
                                            <ion-label position="fixed">
                                                <div v-html=Rpivot></div>
                                            </ion-label>
                                            <ion-input type="number" v-model="op3PivotRow"
                                                @keypress="numberOnlyValidation($event)"></ion-input>
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
    IonSelectOption, IonInput, IonButton, IonLabel, IonItem
} from '@ionic/vue';
import katex from 'katex';

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

        return { equation, Ri, c, Rj, Rpivot };
    },
    data() {
        return {
            rows: 3,
            columns: 3,
            matrix: [['', '', ''], ['', '', ''], ['', '', '']],
            operationExplained: "Multiplica uma linha i por uma constante c",
            undoPile: [[['', '', ''], ['', '', ''], ['', '', '']]],
            redoPile: [[['', '', ''], ['', '', ''], ['', '', '']]],
            selectedLog: 0,
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
        numberOnlyValidation(event: any) {
            const pattern = /[0-9.,]/;
            let inputChar = String(event.key);
            if (!pattern.test(inputChar)) {
                // invalid character, prevent input
                event.preventDefault();
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
        op1Function() {
            this.undoPile.push(this.matrix);
            for (var i = 0; i < this.columns; i++) {
                this.matrix[+this.op1Row - 1][i] = String(+this.op1Constant * +this.matrix[+this.op1Row - 1][i]);
            }
        },
        op2Function() {
            this.undoPile.push(this.matrix);
            var aux = this.matrix[+this.op2Row1 - 1];
            this.matrix[+this.op2Row1 - 1] = this.matrix[+this.op2Row2 - 1];
            this.matrix[+this.op2Row2 - 1] = aux;
        },
        op3Function() {
            this.undoPile.push(this.matrix);
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
        },
        undoAction() {
            if (this.undoPile.length > 1) {
                this.matrix = this.undoPile[0];
                this.redoPile.push(this.undoPile[0]);
                this.undoPile.shift();
            }
        },
        redoAction() {
            if (this.redoPile.length > 1) {
                this.matrix = this.redoPile[0];
                this.undoPile.push(this.redoPile[0]);
                this.redoPile.shift();
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
  