export type SearchInputProps = {
    readOnly: bool,
    placeholderText: string,
    keyWord: string,
    onItemSearch: (x: string) => void,
    clearWord: (x: string) => void,
    isFocus: (event) => event
}