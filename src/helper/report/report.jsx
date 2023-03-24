import React, { Suspense, Component } from "react";
import ReportHeader from "./reportHeader";
import ReportTable from "./Table/table";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf, faFileExcel } from "@fortawesome/free-solid-svg-icons";
// import ReactExport from "react-export-excel";

// const ExcelFile = ReactExport.ExcelFile;
// const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
// const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const ReportComponent = (ComposedComponent) => {
  class Report extends Component {
    generatePDF = async () => {
      let orientation = "landscape";
      let paperSize = "a4";
      if (this.props.orientation) {
        orientation = this.props.orientation;
      }
      if (this.props.paperSize) {
        paperSize = this.props.paperSize;
      }
      const pdf = new jsPDF(orientation, "px", paperSize);
      let html = document.getElementById("pdfReport");
      html.style.display = "inline";
      const data = await html2canvas(document.querySelector("#pdfReport"));
      html.style.display = "none";
      const img = data.toDataURL("image/png");
      const imgProperties = pdf.getImageProperties(img);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;
      pdf.addImage(img, "PNG", 10, 10, pdfWidth - 10, pdfHeight - 10);
      // pdf.html(html, {
      //   callback: (pdf) => pdf.save("report.pdf"),
      //   margin: [10, 10, 10, 10],
      //   autoPaging: "text",
      //   x: 15,
      //   y: 15,
      //   width: pdfWidth,
      //   windowWidth: imgProperties.width,
      // });
      pdf.save("report.pdf");

      //   const input = document.getElementById("report");
      //   await html2canvas(input).then((canvas) => {
      //     const imgData = canvas.toDataURL("image/png");
      //     const pdf = new jsPDF();
      //     pdf.addImage(imgData, "JPEG", 0, 0);
      //     // pdf.output('dataurlnewwindow');
      //     pdf.save("download.pdf");
      //   });

      //   const report = new JsPDF("portrait", "pt", "a4");
      //   report.html(document.querySelector("#report")).then(() => {
      //     report.save("report.pdf");
      //   });
    };

    render() {
      const { data, pageSizes } = this.props;
      return (
        <React.Fragment>
          <div className="mx-2">
            <FontAwesomeIcon
              icon={faFilePdf}
              onClick={this.generatePDF}
              className="mx-2 fa-2x"
              style={{ color: "red", cursor: "pointer" }}
            />
            <FontAwesomeIcon
              icon={faFileExcel}
              onClick={this.generatePDF}
              className="mx-2 fa-2x"
              style={{ color: "green", cursor: "pointer" }}
            />
            {/* <i
              className="fa fa-file-pdf-o fa-2x"
              style={{ color: "red", cursor: "pointer" }}
              aria-hidden="true"
              onClick={this.generatePDF}
            />
            <i
              className="mx-1 fa fa-file-excel-o fa-2x"
              style={{ color: "green", cursor: "pointer" }}
              aria-hidden="true"
            /> */}
          </div>
          {/* <ExcelFile element={<button>Export Excel</button>}>
            <ExcelSheet data={data.rows} name="Report">
              {data.columns.map((column, cIndex) => (
                <ExcelColumn
                  key={cIndex}
                  label={column.title}
                  value={column.field}
                />
              ))}
            </ExcelSheet>
          </ExcelFile> */}
          <div className="border border-dark rounded m-2">
            <div className="row m-1">
              <ReportHeader
                hparam={data.headParameters}
                param={data.parameters}
                name={data.reportName}
              />
            </div>
            <div className="row m-1">
              {ComposedComponent && (
                <ComposedComponent data={data.parameters} />
              )}
            </div>
            <div className="row m-1">
              <ReportTable data={data} pageSizes={pageSizes} />
            </div>
          </div>

          {/* pdf panel */}
          <div
            id="pdfReport"
            style={{ display: "none", backgroundColor: "white" }}
          >
            <div className="row m-1">
              <ReportHeader
                hparam={data.headParameters}
                param={data.parameters}
                name={data.reportName}
              />
            </div>
            <div className="row m-1">
              {ComposedComponent && (
                <ComposedComponent data={data.parameters} />
              )}
            </div>
            <div className="row m-1">
              <ReportTable data={data} pageSizes={[10000]} />
            </div>
          </div>
          {/* end of pdf panel */}
        </React.Fragment>
      );
    }
  }
  return Report;
};

export default ReportComponent;
