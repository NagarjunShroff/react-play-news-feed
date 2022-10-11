import PlayHeader from "common/playlists/PlayHeader";
import { useState, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { data, countries } from "./data";
import NewsCard from "./component/Card";
import "./styles.css";
import CustomToggleButtonGroup from "./component/CustomToggleButtonGroup";

function NewsFeedApplication(props) {
  const [newsData, setNewsData] = useState();
  const [selectedCountry, updateSelectedCountry] = useState("IN");
  const [selectedCategory, updateSelectedCategory] = useState("general");

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(
        `https://newsapi.org/v2/top-headlines?country=${selectedCountry.toLowerCase()}&category=${selectedCategory}&pageSize=100&apiKey=a0d1c2f8467541c380cb42b179d3b263`
      ).then((data) => data.json());
      setNewsData(res.articles);
    }
    // fetchData();
    setNewsData(data);
  }, [selectedCountry, selectedCategory]);

  const handleCountryChange = (event) => {
    updateSelectedCountry(event.target.value);
  };

  const handleCategoryChange = (event) => {
    updateSelectedCategory(event.target.value);
  };

  // Your Code Start below.

  return (
    <>
      <div className="play-details">
        <PlayHeader play={props} />
        <div className="play-details-body" style={{ padding: 0 }}>
          {/* Your Code Starts Here */}
          <div>
            <div className="header-panel">
              <div className="app-title">News Feed</div>
              <div className="header-panel-inputs">
                <div>
                  <FormControl size="small" className="menu-form-control">
                    <InputLabel id="country-select-label">Country</InputLabel>
                    <Select
                      labelId="country-select-label"
                      id="country-select"
                      defaultValue={"IN"}
                      value={selectedCountry}
                      label="Country"
                      onChange={(e) => {
                        handleCountryChange(e);
                      }}
                    >
                      {countries.map((country) => (
                        <MenuItem value={country.code}>{country.name}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
                <CustomToggleButtonGroup
                  selectedCategory={selectedCategory}
                  handleCategoryChange={handleCategoryChange}
                />
              </div>
            </div>
            <div className="card-container">
              {newsData ? (
                newsData.map((news, i) => <NewsCard news={news} />)
              ) : (
                <div>
                  <CircularProgress />{" "}
                </div>
              )}
            </div>
          </div>
          {/* Your Code Ends Here */}
        </div>
      </div>
    </>
  );
}

export default NewsFeedApplication;
