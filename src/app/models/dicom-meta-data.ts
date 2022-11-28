
export default class DicomMetaData {
    public rawMetaData: any = null;

    public getValueByDicomTag(tag: string) {
        if (!this.rawMetaData[tag])
            return undefined;
        return this.rawMetaData[tag].Value;
    }

    public getArrayItemValueByDicomTag(tag: string, index: number = 0) {
        if (!this.rawMetaData[tag])
            return undefined;
        const value = this.rawMetaData[tag].Value;
        if (!value) return undefined;
        if (index >= value.length) return undefined;
        return value[index];
    }
    
}
