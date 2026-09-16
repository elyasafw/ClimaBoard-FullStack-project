import { useMemo, useState } from "react";
import CityPicker, { type PickedCity } from "../components/CityPicker";
import CityWeather from "../components/CityWeather";
import CurrentWeather from "../components/CurrentWeather";
import { useFetch } from "../hooks/useFetch";
import { getComparison, type CompareData } from "../services/compareService";

const ComparePage = () => {
    const [cityA, setCityA] = useState<PickedCity | null>(null);
    const [cityB, setCityB] = useState<PickedCity | null>(null);
    const [pickerAKey, setPickerAKey] = useState(0);
    const [pickerBKey, setPickerBKey] = useState(0);

    const compareFetch = useMemo(() => {
        if (!cityA || !cityB) return null;
        return () =>
            getComparison(
                cityA.latitude,
                cityA.longitude,
                cityB.latitude,
                cityB.longitude,
            );
    }, [cityA, cityB]);

    const { data: comparison, error, loading } =
        useFetch<CompareData>(compareFetch);

    return (
        <>
            <h2>השוואת ערים</h2>
            <CityPicker
                key={`a-${pickerAKey}`}
                label="עיר ראשונה"
                selected={cityA}
                onSelect={setCityA}
                onClear={() => {
                    setCityA(null);
                    setPickerAKey((k) => k + 1);
                }}
            />
            <CityPicker
                key={`b-${pickerBKey}`}
                label="עיר שנייה"
                selected={cityB}
                onSelect={setCityB}
                onClear={() => {
                    setCityB(null);
                    setPickerBKey((k) => k + 1);
                }}
            />

            {loading && <p>טוען השוואה...</p>}
            {error && <p>שגיאה בקבלת נתוני ההשוואה</p>}

            {comparison && (
                <div>
                    <div>
                        <h3>{cityA?.name}</h3>
                        <CurrentWeather
                            weather={comparison.first.current}
                            weatherError={null}
                        />
                        <CityWeather
                            name={null}
                            cityWeather={comparison.first.daily}
                            weatherError={null}
                        />
                    </div>
                    <div>
                        <h3>{cityB?.name}</h3>
                        <CurrentWeather
                            weather={comparison.second.current}
                            weatherError={null}
                        />
                        <CityWeather
                            name={null}
                            cityWeather={comparison.second.daily}
                            weatherError={null}
                        />
                    </div>
                </div>
            )}
        </>
    );
};

export default ComparePage;
