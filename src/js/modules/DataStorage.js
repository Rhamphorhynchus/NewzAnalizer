export class DataStorage {
    saveData(response, q, date) {
        localStorage.newzAnalyzerDataString = JSON.stringify({response, q, date});
    }

    loadData() {
        const data = JSON.parse(localStorage.newzAnalyzerDataString);
        data.date = new Date(data.date);
        return data;
    }

    hasData() {
        return !(localStorage.getItem("newzAnalyzerDataString") === null || localStorage.getItem("newzAnalyzerDataString") === "");
    }
}