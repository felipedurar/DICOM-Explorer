import DicomMetaData from "./dicom-meta-data";

export default class StudyModel {
    public dicomMetaData: DicomMetaData | null = null;

    public PatientName: string = '';
    public PatientID: string = '';
    public Sex: string = '';

    public StudyInstanceUID: string = '';
    public StudyDescription: string = '';
    public StudyDate: string = '';

    constructor(_dicomMetaDataObj: any) {
        this.dicomMetaData = new DicomMetaData();
        this.dicomMetaData.rawMetaData = _dicomMetaDataObj;
        this.parseMetaData();
    }

    public parseMetaData() {
        
        this.PatientName = this.dicomMetaData?.getArrayItemValueByDicomTag('00100010').Alphabetic;
        this.PatientID = this.dicomMetaData?.getArrayItemValueByDicomTag('00100020');
        this.Sex = this.dicomMetaData?.getArrayItemValueByDicomTag('00100040');

        this.StudyInstanceUID = this.dicomMetaData?.getArrayItemValueByDicomTag('0020000D');
        this.StudyDescription = this.dicomMetaData?.getArrayItemValueByDicomTag('00081030');
        this.StudyDate = this.dicomMetaData?.getArrayItemValueByDicomTag('00080020');
    }

}
