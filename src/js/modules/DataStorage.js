export class DataStorage {
    constructor() {

    }

    saveData(response, q, date) {
        localStorage.newzAnalyzerDataString = JSON.stringify({response, q, date});
    }

    loadData() {
        const data = JSON.parse(localStorage.newzAnalyzerDataString);
        data.date = new Date(data.date);
        return data;
        //return JSON.parse(sessionStorage.newzAnalyzerDataString);
    }

    hasData() {
        return !(localStorage.getItem("newzAnalyzerDataString") === null || localStorage.getItem("newzAnalyzerDataString") === "");
        //return localStorage.newzAnalyzerDataString !== null || localStorage.newzAnalyzerDataString !== undefined || localStorage.newzAnalyzerDataString !== "";
    }
}