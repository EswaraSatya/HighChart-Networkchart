import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import { MultiSelect } from 'primereact/multiselect';
import { companyName, mapData, modality, partnership, sector } from "./dataJson";
import "./App.css"
import "primereact/resources/themes/lara-light-cyan/theme.css";


function extractUniqueValues(data, key) {
    const uniqueValues = new Set();
    console.log(uniqueValues, key, "uniqueValuesuniqueValues");
    data.forEach(obj => {
        if (obj.hasOwnProperty(key)) {
            uniqueValues.add(obj[key]);
        }
    });

    const filterFunction = (partner, name) => partner.name.toLowerCase() == name.toLowerCase();

    if (key === "partnership") {
        return Array.from(uniqueValues).map(name => ({
            name,
            id: partnership.find(partner => filterFunction(partner, name))?.id
        }));
    } else if (key === "modality") {
        return Array.from(uniqueValues).map(name => ({
            name,
            id: modality.find(partner => filterFunction(partner, name))?.id
        }));
    }
    else if (key === "companyName") {
        return Array.from(uniqueValues).map(name => ({
            name,
            id: companyName.find(partner => filterFunction(partner, name))?.id
        }));
    } else if (key === "sector") {
        return Array.from(uniqueValues).map(name => ({
            name,
            id: sector.find(partner => filterFunction(partner, name))?.id
        }));
    }
}


const SecondComponent = () => {
    const [filteredData, setFilteredData] = useState([]);
    const [uniqueCompanies, setUniqueCompanies] = useState([]);
    const [currentCompanyIndex, setCurrentCompanyIndex] = useState(0);
    const [tooltipVisible, setTooltipVisible] = useState(false);
    const [tooltipCompany, setTooltipCompany] = useState("");
    const [filteredPartnerShip, setfilteredPartnerShip] = useState([])
    const [filteredModality, setfilteredModality] = useState([])
    const [filteredSector, setfilteredSector] = useState([])

    const [selectedPartnerships, setSelectedPartnerships] = useState(partnership);
    const [selectedModalities, setSelectedModalities] = useState(modality);
    const [selectedSectors, setSelectedSectors] = useState(sector);
    const [justForFormingCheckBoxes, setJustForFormingCheckBoxes] = useState([])

    let tooltipTimer;

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
        setJustForFormingCheckBoxes(companyData)
        setfilteredPartnerShip(extractUniqueValues(companyData, "partnership"))
        setfilteredModality(extractUniqueValues(companyData, "modality"))
        setfilteredSector(extractUniqueValues(companyData, "sector"))
    };

    useEffect(() => {
        if (uniqueCompanies.length > 0) {
            setTooltipCompany(uniqueCompanies[currentCompanyIndex]);
            setTooltipVisible(true);
            filterDataForCompany(uniqueCompanies[currentCompanyIndex]);
        }
    }, [uniqueCompanies, currentCompanyIndex]);


    const handleFilterChange = (values, filterType) => {
        switch (filterType) {
            case 'partnership':
                setSelectedPartnerships(values);
                break;
            case 'modality':
                setSelectedModalities(values);
                break;
            case 'sector':
                setSelectedSectors(values);
                break;
            default:
                break;
        }
    };


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
                                link.marketValue !== "NA" ? link.marketValue + "M" : "",
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
                                link.marketValue !== "NA" ? link.marketValue + "M" : "",
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
                    layoutAlgorithm: {
                        integration: "verlet",
                        linkLength: 170,
                        enableSimulation: true,
                    },
                },
            },

            series: [
                {
                    showInLegend: false,
                    dataLabels: {
                        enabled: true,
                        useHTML: true,
                        verticalAlign: "middle",
                        align: "center",
                        linkFormat: "",
                        allowOverlap: true, // Allow labels to overlap
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
                        symbol: "circle",
                    },
                    id: "lang-tree",
                    data: filteredData,
                },
            ],
        };
        Highcharts.chart("container", options);


    }, [filteredData]);


    useEffect(() => {
        const filteredData = justForFormingCheckBoxes.filter(item => {
            return selectedPartnerships.some(selected => selected.name === item.partnership);
        }).filter(item => {
            return selectedModalities.some(selected => selected.name === item.modality);
        }).filter(item => {
            return selectedSectors.some(selected => selected.name === item.sector);
        });

        setFilteredData(filteredData);
    }, [selectedPartnerships, selectedModalities, selectedSectors]);

    return (
        <>
            {tooltipVisible && (
                <div style={tooltipStyles}>
                    {tooltipCompany}
                </div>
            )}
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                gap: "15px",
                padding: "13px 13px 11px",
            }}>
                <MultiSelect
                    value={selectedPartnerships}
                    onChange={(e) => handleFilterChange(e.value, 'partnership')}
                    options={filteredPartnerShip}
                    optionLabel="name"
                    filter
                    placeholder="Select Partnership"
                    maxSelectedLabels={3}
                    className="w-full md:w-20rem"
                />

                <MultiSelect
                    value={selectedSectors}
                    options={filteredSector}
                    onChange={(e) => handleFilterChange(e.value, 'sector')}
                    optionLabel="name"
                    placeholder="Select Sector"
                    maxSelectedLabels={3}
                    className="w-full md:w-20rem"
                    filter
                />
                <MultiSelect
                    value={selectedModalities}
                    options={filteredModality}
                    onChange={(e) => handleFilterChange(e.value, 'modality')}
                    optionLabel="name"
                    placeholder="Select Modality"
                    maxSelectedLabels={3}
                    className="w-full md:w-20rem"
                    filter
                />
            </div>
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
    top: "60px",
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