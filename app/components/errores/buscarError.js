//funcion que busca los errores y devuelve un string
import { objError } from "../../data/objError.js";
import * as funcionError from "../../helpers/errores.js";

let error = new objError();

export function buscarError(formula){ //itera en todas mis posibilidad de error y devuelve el objeto con todos los datos del error
    error.bool = false;
    !error.bool && (error = funcionError.caracterInvalido(formula));
    !error.bool && (error = funcionError.opConse(formula));
    !error.bool && (error = funcionError.opAntPar(formula));
    !error.bool && (error = funcionError.numAntPar(formula));
    !error.bool && (error = funcionError.numDpsPar(formula));
    !error.bool && (error = funcionError.parDeParentesis(formula));
    !error.bool && (error = funcionError.ingresoIgual(formula));

    return error;
}