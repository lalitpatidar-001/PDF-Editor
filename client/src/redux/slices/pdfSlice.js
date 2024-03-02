import  {createSlice} from "@reduxjs/toolkit";

/*
    pdfSlice :
        *store user's all  saved pdf and generated pdf 
        * provide action to change pdf store
*/

const initialState = {
    pdf:[],
    generatedPdf:null
}
const pdfSlice = createSlice({
    name:"pdf",
    initialState,
    reducers:
        {
            getAllPdf:(state,action)=>{
                state.pdf = action.payload.pdfs;
            },
            updatePdf:(state,action)=>{
                state.pdf.unshift(action.payload.pdf)
            },
            addGeneratedPdf:(state,action)=>{
                state.generatedPdf = action.payload.generatedPdf;
            },
            removePdf:(state,action)=>{
                state.pdf = state.pdf.filter(pdf=> pdf._id !== action.payload.id);
            }
        }
});


export const {getAllPdf , updatePdf ,addGeneratedPdf,removePdf} = pdfSlice.actions;

export default pdfSlice.reducer;