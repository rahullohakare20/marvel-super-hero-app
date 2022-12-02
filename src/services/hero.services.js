import { ORDER } from "../constants/oder.constant";

export const getQuery = (searchText, order, rowsPerPage, page) => {
    let query = "";

    if (searchText.length) {
        query += `&nameStartsWith=${searchText}`
    }

    if (order) {
        let field = "name";
        if (order !== ORDER.ASC) {
            field = "-name";
        }
        query += `&orderBy=${field}`
    }

    if (rowsPerPage) {
        query += `&limit=${rowsPerPage}`
    }

    if (rowsPerPage) {
        const offset = (page) * rowsPerPage;
        query += `&offset=${offset}`
    }

    return sanitizeQuery(query);
}

const sanitizeQuery = (query) => {
    if (!query.length) return '';

    return query.replace(/&/, '?');
}

export const getMobileCss = (matches) => {
    const mobileCss = matches ?
        {
            width: 750,
            height: 750,
            m: "0 auto",
            objectFit: "contain",
        } :
        {
            width: '100%',
            height: 400,
            m: "0 auto",
            objectFit: "contain",
        }

    return mobileCss;
}