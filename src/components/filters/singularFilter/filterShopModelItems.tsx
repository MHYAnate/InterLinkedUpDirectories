"use client";
import styles from "./styles.module.css";
import Image from "next/image";
import { ShopData } from "@/database/shopData";
import Pagination from "@/components/btn/paginationBtn";
import { useState, useEffect, useCallback, useTransition } from "react";

import { MarketStatus } from "@/database/marketStatus";
import { MarketTag } from "@/database/marketTag";
import { MarketCondition } from "@/database/marketCondition";
import { useForm } from "react-hook-form";

type ShopValues = {
	tag: string;
	status: string;
	condition: string;
	title: string;
};

type ShopName = {
	shopName: string;
};

const ShopModelStock: React.FC<ShopName> = ({ shopName }) => {
	const {
		register,
		handleSubmit,
		watch,
		reset,
		unregister,
		setFocus,
		setValue,
		control,
		formState: {
			isSubmitSuccessful,
			errors,
			isSubmitted,
			isSubmitting,
			isDirty,
			isValid,
		},
	} = useForm<ShopValues>({
		defaultValues: {
			status: "",
			tag: "",
			condition: "",
			title: "",
		},
		shouldUseNativeValidation: true,
		mode: "onChange",
	});

	const status = watch("status");

	const tag = watch("tag");

	const condition = watch("condition");

	const [shopSearchInput, setShopSearchInput] = useState("");

	const [show, setShow] = useState("");

	const [currentPage, setCurrentPage] = useState(1);
	
	const [postsPerPage] = useState(6);

	const updateSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
		setShopSearchInput(event.target.value);
		// handleSuggestionClick;
	};

	function renderAvailablStockTag() {
		if (!MarketTag) {
			// Return a message or component indicating that the "Maintenance" category is not found
			return null;
		}
		return MarketTag.map((tag) => (
			<option className={styles.renderCover} key={tag.id} value={tag.tag}>
				{tag.tag}
			</option>
		));
	}

	function renderAvailablStockCondition() {
		if (!MarketCondition) {
			// Return a message or component indicating that the "Maintenance" category is not found
			return null;
		}
		return MarketCondition.map((condition) => (
			<option
				className={styles.renderCover}
				key={condition.id}
				value={condition.condition}
			>
				{condition.condition}
			</option>
		));
	}

	function renderAvailablStockStatus() {
		if (!MarketStatus) {
			// Return a message or component indicating that the "Maintenance" category is not found
			return null;
		}
		return MarketStatus.map((status) => (
			<option
				className={styles.renderCover}
				key={status.id}
				value={status.status}
			>
				{status.status}
			</option>
		));
	}

	const items = ShopData.find((shop) => shop.shopName === `${shopName}`);

	if (!items) return null;

	const filteredStockTag =
		items.items.length > 0
			? items.items.filter((eachItem) => {
					const text = eachItem.tag.toLowerCase();
					return tag !== (null || undefined || "" || "Select Tag")
						? text.includes(tag.toLowerCase())
						: text;
			  })
			: [];

	const filteredStockStatus =
		filteredStockTag.length > 0
			? filteredStockTag.filter((eachItem) => {
					const text = eachItem.status.toLowerCase();
					return status !== (null || undefined || "" || "Select Status")
						? text.includes(status.toLowerCase())
						: text;
			  })
			: [];

	const filteredStockCondition =
		filteredStockStatus.length > 0
			? filteredStockStatus.filter((eachItem) => {
					const text = eachItem.condition.toLowerCase();
					return condition !== (null || undefined || "" || "Select Condition")
						? text.includes(condition.toLowerCase())
						: text;
			  })
			: [];

	const filteredList =
		filteredStockCondition.length > 0
			? filteredStockCondition.filter((eachItem) => {
					const text = eachItem.title.toLowerCase();
					return text.includes(shopSearchInput.toLowerCase());
			  })
			: [];



	// Get current posts
	const indexOfLastPost = currentPage * postsPerPage;
	const indexOfFirstPost = indexOfLastPost - postsPerPage;
	const currentPosts = filteredList.slice(indexOfFirstPost, indexOfLastPost);

	// Change page
	const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

	function RenderAvailableModelStocks() {
		if (filteredList.length === 0) {
			// Return a message or component indicating that the "Maintenance" category is not found
			return (
				<div>
					<div>No item found</div>
				</div>
			);
		}

		return currentPosts?.map((item) => (
			<div className={styles.InRenderItemCover} key={item.id}>
				<div className={styles.InShopItemsCover}>
					<div className={styles.InShopsItemsImgCover}>
						<Image
							className={styles.InShopItemImg}
							src={`${item.image}`}
							alt={`${item.title}`}
							quality={100}
							width={500}
							height={500}
							// unoptimized
						/>
					</div>
					{show === `${item.id}` ? (
						<></>
					) : (
						<div className={styles.InShopItemsDetailCover}>
							<div className={styles.InShopItemsDetailTitleName}>
								{item.title}
							</div>
							<div className={styles.InShopItemsBody}>{item.price}</div>
						</div>
					)}
				</div>
				{show === `${item.id}` && (
					<div className={styles.InShowMoreDetails}>
						<div className={styles.InShopsItemsImgCover}>
							<Image
								className={styles.InShopItemImg}
								src={`${item.image2}`}
								alt={`${item.title}`}
								quality={100}
								width={500}
								height={500}
								// unoptimized
							/>
						</div>
						<div className={styles.InShowMoreDetailCover}>
							<div className={styles.InShopItemsDetailCover}>
								<div className={styles.InShopItemsDetailTitleName}>
									{item.title}
								</div>
								<div className={styles.InShopItemsBody}>{item.price}</div>
							</div>
							<div className={styles.InShowMoreItemsDetailsBody}>
								<span className={styles.InShopItemsDetailTitle}>Condition</span>
								<span className={styles.InShopItemsBody}>{item.condition}</span>
							</div>
							<div>
								<span className={styles.InShopItemsDetailTitle}>Status</span>
								<span className={styles.InShopItemsBody}>{item.status}</span>
							</div>
							<div>
								<span className={styles.InShopItemsDetailTitle}>feature</span>
								<span className={styles.InShopItemsBody}>{item.features}</span>
							</div>
						</div>
					</div>
				)}
				<div
					className={show !== `${item.id}` ? styles.InBtn : styles.InBtnA}
					onClick={
						show !== `${item.id}`
							? () => setShow(`${item.id}`)
							: () => setShow("")
					}
				>
					{show === `${item.id}` ? "Show Less" : "More Details"}
				</div>
			</div>
		));
	}

	return (
		<div className={styles.shopItemBodyCover}>
			<div className={styles.InShopItemsFilterCover}>
				<form className={styles.filter} onSubmit={handleSubmit(console.log)}>
					<div className={styles.selectGroup}>
						<div className={styles.selectCover}>
							<select
								value={tag !== (undefined || null) ? tag : "Select Tag"}
								className={styles.select}
								{...register("tag")}
							>
								<option className={styles.option} value="Select Tag">
									Select Tag
								</option>
								{renderAvailablStockTag()}
							</select>
						</div>
						<div className={styles.selectCover}>
							<select
								value={
									status !== (undefined || null)
										? status
										: tag
										? ""
										: "Select Status"
								}
								className={styles.select}
								{...register("status")}
							>
								<option className={styles.option} value="Select Status">
									Select Status
								</option>
								{renderAvailablStockStatus()}
							</select>
						</div>
						<div className={styles.selectCover}>
							<select
								value={
									condition !== (undefined || null)
										? condition
										: tag
										? ""
										: "Select Condition"
								}
								className={styles.select}
								{...register("condition")}
							>
								<option className={styles.option} value="Select condition">
									Select Condition
								</option>
								{renderAvailablStockCondition()}
							</select>
						</div>
						<div className={styles.inputCover}>
							<input
								type="search"
								className={styles.input}
								{...register("title")}
								value={shopSearchInput}
								onChange={updateSearchInput}
								id="vendorAddress"
								placeholder="Name of Items"
							/>
						</div>
					</div>
				</form>
				<div className={styles.renderAvModStock}>
					{RenderAvailableModelStocks()}
				</div>

				<div>
					<Pagination
						postsPerPage={postsPerPage}
						totalPosts={filteredList.length}
						paginate={paginate}
						currentpage={currentPage}
					/>
				</div>
			</div>
			<div className={styles.shopItemsTranscation}></div>
		</div>
	);
};

ShopModelStock.displayName = "ShopModelStock";
export default ShopModelStock;
