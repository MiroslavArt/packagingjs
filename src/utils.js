export const formatError = text => `
<span style="color: red;">
    ${text}
</span>
`;

export const changemode = (mode, calcform, timerform) => {
    if(mode=='timer') {
        calcform.style.display = 'none';
        timerform.style.display = 'block';
    } else {
        calcform.style.display = 'block';
        timerform.style.display = 'none';
    }
}