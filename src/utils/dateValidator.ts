/* eslint-disable eqeqeq */
import { RuleObject } from "antd/lib/form";
import { StoreValue } from "antd/lib/form/interface";
import moment from "antd/node_modules/moment";

export function minDateValidator(rule: RuleObject, value: StoreValue, callback: (error?: string) => void) {
    const date = moment(value);
    if(date.isBefore(moment(new Date()), "day")) return callback("A data não pode ser anterior a data atual");
    return callback();
}

export function maxDateValidator(rule: RuleObject, value: StoreValue, callback: (error?: string) => void) {
    const date = moment(value);
    if(date.isAfter(moment(new Date()), "day")) return callback("A data não pode ser posterior a data atual");
    return callback();
}