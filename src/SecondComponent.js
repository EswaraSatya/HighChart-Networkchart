import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsNetworkgraph from "highcharts/modules/networkgraph";
import HighchartsExporting from "highcharts/modules/exporting";
import HighchartsAccessibility from "highcharts/modules/accessibility";
import { mapData } from "./dataJson";

HighchartsNetworkgraph(Highcharts);
HighchartsExporting(Highcharts);
HighchartsAccessibility(Highcharts);


const SecondComponent = () => {
    const [filteredData, setFilteredData] = useState([]);
    const [uniqueCompanies, setUniqueCompanies] = useState([]);
    const [currentCompanyIndex, setCurrentCompanyIndex] = useState(0);
    const [tooltipVisible, setTooltipVisible] = useState(false);
    const [tooltipCompany, setTooltipCompany] = useState("");
    let tooltipTimer;

    const marKerSymbols =
        [
            "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN/rXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz/SMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH/w/qQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA/g88wAAKCRFRHgg/P9eM4Ors7ONo62Dl8t6r8G/yJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt/qIl7gRoXgugdfeLZrIPQLUAoOnaV/Nw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl/AV/1s+X48/Pf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H/LcL//wd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93/+8//UegJQCAZkmScQAAXkQkLlTKsz/HCAAARKCBKrBBG/TBGCzABhzBBdzBC/xgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD/phCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5Si +ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVi +pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q/pH5Z/YkGWcNMw09DpFGgsV/jvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY/R27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4/OBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L/1U/W36p/VHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N/T0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26/uNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE/C5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV/MN8C3yLfLT8Nvnl+F30N/I/9k/3r/0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt/87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi/RNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a/zYnKOZarnivN7cyzytuQN5zvn//tEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+ 1dT1gvWd+ 1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO/PLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3/T7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA/0HIw6217nU1R3SPVRSj9Yr60cOxx+ 1/p3vdy0NNg1VjZzG4iNwRHnk6fcJ3/ceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb+ 16EHTh0kX/i +c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8/pPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb/1tWeOT3dvfN6b/fF9/XfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR/cGhYPP/pH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF/6i/suuFxYvfvjV69fO0ZjRoZfyl5O/bXyl/erA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o/2j5sfVT0Kf7kxmTk/8EA5jz/GMzLdsAAAAgY0hSTQAAeiUAAICDAAD5/wAAgOkAAHUwAADqYAAAOpgAABdvkl/FRgAAAVVJREFUeNpi/P37NwOxYM2pHtm7lw8uYmBgYGAiVtPC3RWh+88vuneT474Dv4DkcUZibJy8PG72le/nkn+zMzAaMhnNyY1clMpCjKbz/86lMLAzMMA0MTAwMOC1Ea6JgYFB9pPwncbMg6owOaY1p3pk15zqkcWnie8j63ddY18nZHmWI2eW3vzN/Jf168c3UfGuHathAXHl+7lkBnYGBtafDP8NVd3jQ8xKHiNrZMyeqPPtE/9vTgYGBgb1H4oHlHXt43ZfWfDwNzsDIwMDA4POX831RXGrg9BdxLhob63VgTurjsAUsv5k+A9jC3/g/NCdfVoQm/+ZIu3qjhnyW3XABJANMNL19cYVcPBQrZpq9eyFwCdJmIT6D8UD5cmbHXFphKccI9Mgc84vTH9goYhPE4rGELOSx0bSjsUMDAwMunJ2FQST0+/fv1Hw5BWJbehi2DBgAHTKsWmiz+rJAAAAAElFTkSuQmCC)",
            "triangle",
            "cross",
            "url(https://www.highcharts.com/samples/graphics/sun.png)",
            'circle',
            'square',
            'diamond',
            'triangle',
            'triangle-down'
        ]

    const getRandomSymbol = () => {
        const randomIndex = Math.floor(Math.random() * marKerSymbols.length);
        return marKerSymbols[randomIndex];
    };

    const handleButtonClick = (direction) => {
        let newIndex = currentCompanyIndex;
        if (direction === "<") {
            newIndex = currentCompanyIndex === 0 ? uniqueCompanies.length - 1 : currentCompanyIndex - 1;
        } else {
            newIndex = currentCompanyIndex === uniqueCompanies.length - 1 ? 0 : currentCompanyIndex + 1;
        }
        setCurrentCompanyIndex(newIndex);
        filterDataForCompany(uniqueCompanies[newIndex]);
        showTooltip(uniqueCompanies[newIndex]);
    };

    const showTooltip = (companyName) => {
        setTooltipCompany(companyName);
        setTooltipVisible(true);
        clearTimeout(tooltipTimer);
        tooltipTimer = setTimeout(() => {
            setTooltipVisible(false);
        }, 5000);
    };

    useEffect(() => {
        const companies = [...new Set(mapData.map(item => item.from))];
        setUniqueCompanies(companies);
    }, []);

    const filterDataForCompany = (companyName) => {
        const companyData = mapData.filter(item => item.from === companyName);
        setFilteredData(companyData);
    };

    useEffect(() => {
        if (uniqueCompanies.length > 0) {
            setTooltipCompany(uniqueCompanies[currentCompanyIndex]);
            setTooltipVisible(true);
            filterDataForCompany(uniqueCompanies[currentCompanyIndex]);
        }
    }, [uniqueCompanies, currentCompanyIndex]);



    useEffect(() => {
        const afterSetOptionsHandler = function (e) {
            const sectorColorsMap = {
                "Drug discovery and Development": "#f56e8b",
                Biotechnology: "#4D93D9",
                "Healthcare SaaS": "#934BC9",
                "Drug Delivery Technology": "#fcba03",
                "Disease Diagnostics and Devices": "#47D359",
                "Drug manufacturing": "#E97132",
                "Medical Devices & Equipment": "#808000",
            };

            const nodes = {};
            let i = 0;

            if (this instanceof Highcharts.Series && e.options.id === "lang-tree") {

                let mainNode = null;

                e.options.data.forEach(function (link) {
                    if (!mainNode) {
                        mainNode = link.from;
                    }
                });

                e.options.data.forEach(function (link) {
                    if (!nodes[link.from]) {
                        nodes[link.from] = {
                            id: link.from,
                            marketValue:
                                link.marketValue != "NA" ? link.marketValue + "M" : "",
                            partnership: link.partnership,
                            marker: {
                                radius:
                                    link.from === "Bayer" ||
                                        link.from === "Astrazeneca" ||
                                        link.from === "Merck & Co" ||
                                        link.from === "AbbVie" ||
                                        link.from === "Novartis" ||
                                        link.from === "Bristol-Myers Squibb" ||
                                        link.from === "Johnson & Johnson" ||
                                        link.from === "Pfizer" ||
                                        link.from === "Sanofi" ||
                                        link.from === "Amgen" ||
                                        link.from === "BioNTech" ||
                                        link.from === "Boehringer Ingelheim" ||
                                        link.from === "Eli Lilly & Co" ||
                                        link.from === "Gilead Sciences" ||
                                        link.from === "GSK" ||
                                        link.from === "Merck KGaA" ||
                                        link.from === "Moderna" ||
                                        link.from === "Novo Nordisk" ||
                                        link.from === "Takeda" ||
                                        link.from === "Roche"
                                        ? 1
                                        : 7,
                            },
                            to: link.to,
                            color: sectorColorsMap[link.sector.toLowerCase()],
                            Modality: link.Modality,
                            companyName: link.companyName,
                        };
                    }

                    if (!nodes[link.to]) {
                        nodes[link.to] = {
                            id: link.to,
                            marketValue:
                                link.marketValue != "NA" ? link.marketValue + "M" : "",
                            to: link.to,
                            partnership: link.partnership,
                            marker: {
                                radius: 7,
                            },
                            Modality: link.Modality,
                            companyName: link.companyName,
                            color: sectorColorsMap[link.sector],
                        };
                    }

                    nodes[link.from].color = sectorColorsMap[link.sector];
                    nodes[link.to].color = sectorColorsMap[link.sector];
                    link.color = sectorColorsMap[link.sector];
                });
                e.options.nodes = Object.keys(nodes).map(function (id) {
                    return nodes[id];
                });
            }
        };

        // Add event listener
        Highcharts.addEvent(
            Highcharts.Series,
            "afterSetOptions",
            afterSetOptionsHandler
        );
        const options = {
            chart: {
                type: "networkgraph",
                height: "75%",
                // plotBorderWidth: 1
            },
            title: {
                text: ''
            },
            subTitle: {
                text: ''
            },
            credits: {
                enabled: false
            },
            legend: {
                enabled: true,
            },
            tooltip: {
                enabled: false,
            },
            exporting: {
                enabled: false
            },
            plotOptions: {
                networkgraph: {
                    link: { color: "red", width: "2" },
                    keys: ["from"],
                    layoutAlgorithm: {
                        integration: "verlet",
                        linkLength: 170,
                    },
                },
            },

            series: [
                {
                    showInLegend: false,
                    dataLabels: false,
                    accessibility: {
                        enabled: false,
                    },
                    dataLabels: {
                        enabled: true,
                        useHTML: true,
                        verticalAlign: "middle",
                        align: "center",
                        linkFormat: "",
                        allowOverlap: true, // Allow labels to overlap
                        textPath: {
                            enabled: true,
                        },
                        formatter: function () {
                            var logoUrl;
                            var content;

                            if (this.point.name === "Astrazeneca") {
                                logoUrl =
                                    "https://www.vyopta.com/wp-content/uploads/2019/06/astrazeneca-PNG-logo.png";
                            } else if (this.point.name === "Merck & Co") {
                                logoUrl =
                                    "https://download.logo.wine/logo/Merck_%26_Co./Merck_%26_Co.-Logo.wine.png";
                            } else if (this.point.name === "AbbVie") {
                                logoUrl =
                                    "https://1000logos.net/wp-content/uploads/2023/03/AbbVie-logo.png";
                            } else if (this.point.name === "Novartis") {
                                logoUrl =
                                    "https://www.novartis.com/sites/novartis_com/files/styles/webp/public/2021-10/novartis-logo-transparent.png.webp?itok=-VFFv5qx";
                            } else if (this.point.name === "Bristol-Myers Squibb") {
                                logoUrl =
                                    "https://logos-world.net/wp-content/uploads/2023/10/BMS-Bristol-Myers-Squibb-Emblem.png";
                            } else if (this.point.name === "Johnson & Johnson") {
                                logoUrl =
                                    "https://companieslogo.com/img/orig/JNJ-5579062e.png?t=1698397492";
                            } else if (this.point.name === "Pfizer") {
                                logoUrl =
                                    "https://upload.wikimedia.org/wikipedia/commons/8/8b/Pfizer_%282021%29.png";
                            } else if (this.point.name === "Bayer") {
                                logoUrl =
                                    "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Logo_Bayer.svg/600px-Logo_Bayer.svg.png";
                            } else if (this.point.name === "Sanofi") {
                                logoUrl =
                                    "https://upload.wikimedia.org/wikipedia/commons/7/7d/Logo_Sanofi_%282022%29.png";
                            } else if (this.point.name === "Amgen") {
                                logoUrl =
                                    "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Amgen.svg/1200px-Amgen.svg.png";
                            } else if (this.point.name === "BioNTech") {
                                logoUrl =
                                    "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/BioNTech_Logo.png/1197px-BioNTech_Logo.png";
                            } else if (this.point.name === "Boehringer Ingelheim") {
                                logoUrl =
                                    "https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Boehringer_Ingelheim_Logo.svg/2560px-Boehringer_Ingelheim_Logo.svg.png";
                            } else if (this.point.name === "Eli Lilly & Co") {
                                logoUrl =
                                    "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Eli_Lilly_and_Company.svg/2560px-Eli_Lilly_and_Company.svg.png";
                            } else if (this.point.name === "Gilead Sciences") {
                                logoUrl =
                                    "https://download.logo.wine/logo/Gilead_Sciences/Gilead_Sciences-Logo.wine.png";
                            } else if (this.point.name === "GSK") {
                                logoUrl =
                                    "https://upload.wikimedia.org/wikipedia/en/thumb/3/32/GSK_logo_2022.svg/2560px-GSK_logo_2022.svg.png";
                            } else if (this.point.name === "Merck KGaA") {
                                logoUrl =
                                    "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Logo_Merck_KGaA_2015.svg/1200px-Logo_Merck_KGaA_2015.svg.png";
                            } else if (this.point.name === "Moderna") {
                                logoUrl =
                                    "https://www.jdrf.org/wp-content/uploads/2020/04/Moderna-Logo-1200x800-1.jpg";
                            } else if (this.point.name === "Novo Nordisk") {
                                logoUrl =
                                    "https://upload.wikimedia.org/wikipedia/en/thumb/b/b1/Novo_Nordisk_-_Logo.svg/1200px-Novo_Nordisk_-_Logo.svg.png";
                            } else if (this.point.name === "Takeda") {
                                logoUrl =
                                    "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Takeda_Pharmaceutical_Company_logo.svg/2560px-Takeda_Pharmaceutical_Company_logo.svg.png";
                            } else if (this.point.name === "Roche") {
                                logoUrl =
                                    "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Hoffmann-La_Roche_logo.svg/2560px-Hoffmann-La_Roche_logo.svg.png";
                            } else if (this.point.name === "Merck & Co") {
                                logoUrl =
                                    "https://download.logo.wine/logo/Merck_%26_Co./Merck_%26_Co.-Logo.wine.png";
                            }

                            if (logoUrl) {
                                content =
                                    '<div style="background:white; z-index: 1000000;position: relative;width: 55px;height: 55px;border-radius:50px ;background-color: #fff;border: 1px solid #000;">' +
                                    '<img src="' +
                                    logoUrl +
                                    '"style="width: 45px; height: 45px;border-radius: 50px;width: 91%;height: auto;position: relative;top: 50%; transform: translate(0%, -50%);padding:4px;' +
                                    (this.y - 10) +
                                    "px; left: " +
                                    (this.x - 10) +
                                    'px;">' +
                                    "</div>";
                            }

                            if (!logoUrl) {
                                content =
                                    "<div style='margin-bottom: 40px;font-size: 10px;margin-left: 20px;display:flex;flex-wrap:wrap;'>" +
                                    "<div style='width:140px; word-break: break-word; white-space: pre-wrap;'>" +
                                    this.point.companyName +
                                    "</div>" +
                                    "<div style='display: flex; gap:3px;'>" +
                                    `<div style='color:violet;'>${this.point.marketValue ? "$" : ""
                                    }${this.point.marketValue}</div>` +
                                    "<div>(" +
                                    this.point.partnership +
                                    ")</div>" +
                                    "</div>" +
                                    "</div>";
                            }
                            return content;
                        },
                    },
                    marker: {
                        symbol: getRandomSymbol(),
                    },
                    id: "lang-tree",
                    accessibility: {
                        enabled: false,
                    },
                    data: filteredData,
                },
            ],
        };
        Highcharts.chart("container", options);
    }, [filteredData]);


    return (
        <>
            {tooltipVisible && (
                <div style={tooltipStyles}>
                    {tooltipCompany}
                </div>
            )}
            <div style={{ display: "flex", alignItems: "center" }}>

                <button
                    onClick={() => handleButtonClick("<")}
                    style={buttonStyles}
                    onMouseEnter={() => setTooltipVisible(false)}
                >
                    {"<"}
                </button>
                <div id="container" style={{ width: "100%", height: "100%" }}></div>
                <button
                    onClick={() => handleButtonClick(">")}
                    style={buttonStyles}
                    onMouseEnter={() => setTooltipVisible(false)}
                >
                    {">"}
                </button>

            </div>
        </>
    )
}


const buttonStyles = {
    background: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "50%",
    width: "40px",
    height: "40px",
    fontSize: "20px",
    cursor: "pointer",
    transition: "background 0.3s",
    outline: "none",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
    marginTop: "-23%",
    marginLeft: "12px",
    marginRight: "12px"
};

const tooltipStyles = {
    position: "fixed",
    top: "20px",
    left: "50%",
    transform: "translateX(-50%)",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    color: "#fff",
    padding: "10px 20px",
    borderRadius: "5px",
    zIndex: "9999",
    transition: "opacity 3.5s ease-in-out"
};



export default SecondComponent