import styles from "./styles.module.css";
const Loading = () => {
	return (
		<div>
			<div className={styles.contain}>
								<div className={styles.iludcover}>
									<div className={styles.front}>
										<div className={styles.ilud}>
											ILU<span className={styles.footerIludSpan}>D</span>
										</div>
									</div>
									<div className={styles.back}>
										<div className={styles.ilud}>
											ILU<span className={styles.footerIludSpan}>D</span>
										</div>
									</div>
									<div className={styles.right}>
										<div className={styles.ilud}>
											ILU<span className={styles.footerIludSpan}>D</span>
										</div>
									</div>
									<div className={styles.left}>
										<div className={styles.ilud}>
											ILU<span className={styles.footerIludSpan}>D</span>
										</div>
									</div>
									<div className={styles.top}>
										<div className={styles.ilud}>
											ILU<span className={styles.footerIludSpan}>D</span>
										</div>
									</div>
									<div className={styles.bottom}>
										<div className={styles.ilud}>
											ILU<span className={styles.footerIludSpan}>D</span>{" "}
										</div>
									</div>
								</div>
							</div>
		</div>
	);
};

export default Loading;