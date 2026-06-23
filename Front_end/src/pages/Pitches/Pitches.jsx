import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import styles from "./Pitches.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch, faMapMarkerAlt,
  faStar, faFutbol, faTimes
} from "@fortawesome/free-solid-svg-icons";

export function BrowsePitches() {
  const navigate = useNavigate();
  const [pitches, setPitches] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const filters = ["All", "Indoor", "Outdoor", "Grass", "5-a-side", "7-a-side"];

  useEffect(() => {
    const fetchPitches = async () => {
      try {
   const res = await axios.get("http://localhost:8000/pitch/getpitch");
        setPitches(res.data.pitchs);
        setFiltered(res.data.pitchs);
      } catch (err) {
        console.error("Error fetching pitches:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPitches();
  }, []);

  useEffect(() => {
    let result = [...pitches];
    if (search.trim()) {
      result = result.filter(p =>
        p.pitchName?.toLowerCase().includes(search.toLowerCase()) ||
        p.pitchLocation?.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (activeFilter !== "All") {
      result = result.filter(p =>
        p.pitchDescription?.toLowerCase().includes(activeFilter.toLowerCase()) ||
        p.pitchName?.toLowerCase().includes(activeFilter.toLowerCase())
      );
    }
    setFiltered(result);
  }, [search, activeFilter, pitches]);

  return (
    <div className={styles.page}>
      <div className={styles.pitchBg} />
      <div className={styles.pitchOverlay} />
      <div className={styles.container}>

        <div className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>
            <FontAwesomeIcon icon={faFutbol} className={styles.titleIcon} />
            Browse Pitches
          </h1>
          <p className={styles.pageSubtitle}>Find and book your perfect pitch</p>
        </div>

        <div className={styles.searchWrap}>
          <FontAwesomeIcon icon={faSearch} className={styles.searchIcon} />
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search by name or location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <button className={styles.clearBtn} onClick={() => setSearch("")}>
              <FontAwesomeIcon icon={faTimes} />
            </button>
          )}
        </div>

        <div className={styles.filtersRow}>
          {filters.map(f => (
            <button
              key={f}
              className={`${styles.filterChip} ${activeFilter === f ? styles.filterActive : ""}`}
              onClick={() => setActiveFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>

        <p className={styles.resultsCount}>
          {filtered.length} pitch{filtered.length !== 1 ? "es" : ""} found
        </p>

        {loading ? (
          <div className={styles.loadingWrap}>
            <div className={styles.spinner} />
            <p>Loading pitches...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className={styles.emptyState}>
            <FontAwesomeIcon icon={faFutbol} className={styles.emptyIcon} />
            <p>No pitches found. Try a different search.</p>
          </div>
        ) : (
          <div className={styles.grid}>
            {filtered.map(pitch => (
              <div
                key={pitch._id}
                className={styles.card}
                onClick={() => navigate(`/pitch/${pitch._id}`, { state: { pitch } })}
              >
                <div className={styles.cardImgWrap}>
                  <img src={pitch.pitchImage} alt={pitch.pitchName} className={styles.cardImg} />
                  <div className={styles.cardBadge}>
                    <FontAwesomeIcon icon={faStar} /> 4.8
                  </div>
                </div>
                <div className={styles.cardBody}>
                  <h3 className={styles.cardTitle}>{pitch.pitchName}</h3>
                  <p className={styles.cardLocation}>
                    <FontAwesomeIcon icon={faMapMarkerAlt} /> {pitch.pitchLocation}
                  </p>
                  <p className={styles.cardDesc}>{pitch.pitchDescription}</p>
                  <div className={styles.cardFooter}>
                    <span className={styles.cardPrice}>
                      {pitch.pitchPrice} EGP<span className={styles.perHour}>/hr</span>
                    </span>
                    <button className={styles.bookBtn}>Book Now</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export function PitchDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const pitch = location.state?.pitch;

  if (!pitch) return (
    <div className={styles.page}>
      <div className={styles.pitchBg} />
      <div className={styles.pitchOverlay} />
      <div className={styles.container}>
        <div className={styles.loadingWrap}>
          <div className={styles.spinner} />
          <p>Loading details...</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className={styles.page}>
      <div className={styles.pitchBg} />
      <div className={styles.pitchOverlay} />
      <div className={styles.container}>

        <button className={styles.backBtn} onClick={() => navigate(-1)}>
          ← Back to Pitches
        </button>

        <div className={styles.detailImgWrap}>
          <img src={pitch.pitchImage} alt={pitch.pitchName} className={styles.detailImg} />
          <div className={styles.detailImgOverlay}>
            <h1 className={styles.detailTitle}>{pitch.pitchName}</h1>
            <p className={styles.detailLocation}>
              <FontAwesomeIcon icon={faMapMarkerAlt} /> {pitch.pitchLocation}
            </p>
          </div>
        </div>

        <div className={styles.detailCard}>
          <div className={styles.detailTopRow}>
            <div className={styles.ratingBadge}>
              <FontAwesomeIcon icon={faStar} /> 4.8 <span>(24 reviews)</span>
            </div>
            <div className={styles.priceTag}>
              {pitch.pitchPrice} EGP<span>/hr</span>
            </div>
          </div>

          <div className={styles.divider} />

          <h3 className={styles.sectionLabel}>About this Pitch</h3>
          <p className={styles.detailDesc}>{pitch.pitchDescription}</p>

          <div className={styles.divider} />

          <h3 className={styles.sectionLabel}>Facilities</h3>
          <div className={styles.facilitiesRow}>
            {["Changing Rooms", "Parking", "Floodlights", "Water", "First Aid"].map(f => (
              <span key={f} className={styles.facilityChip}>✓ {f}</span>
            ))}
          </div>

          <div className={styles.divider} />

          <button
            className={styles.bookBtnLg}
            onClick={() => navigate("/select-slot", { state: { pitch } })}
          >
            Book This Pitch
          </button>
        </div>
      </div>
    </div>
  );
}
