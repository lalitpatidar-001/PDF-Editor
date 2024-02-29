import  {createSlice} from "@reduxjs/toolkit";

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
            }
        }
});


export const {getAllPdf , updatePdf ,addGeneratedPdf} = pdfSlice.actions;

export default pdfSlice.reducer;