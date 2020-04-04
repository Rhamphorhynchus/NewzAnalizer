export class DataStorage {
    constructor() {

    }

    saveData(response, q, date) {
        sessionStorage.newzAnalyzerDataString = JSON.stringify({response, q, date});
    }

    loadData() {
        const data = JSON.parse(sessionStorage.newzAnalyzerDataString);
        data.date = new Date(data.date);
        return data;
        //return JSON.parse(sessionStorage.newzAnalyzerDataString);
    }

    hasData() {
        return sessionStorage.newzAnalyzerDataString !== null || sessionStorage.newzAnalyzerDataString !== undefined || sessionStorage.newzAnalyzerDataString !== "";
    }
}