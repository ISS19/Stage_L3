import React from "react";
import styles from "@/styles/Loader.module.scss";

export function Loader() {
    return (
        <div className={styles.infinity}>
            <div>
                <span></span>
            </div>
            <div>
                <span></span>
            </div>
            <div>
                <span></span>
            </div>
        </div>
    );
}
