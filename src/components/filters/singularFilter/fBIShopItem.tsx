import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useForm } from "react-hook-form";
import Image from 'next/image';
import styles from './styles.module.css'; // Adjust the import path as needed
import firebase from "@/firebase/firebase";
const { auth, storage, database, clientColRef, add, getClientDoc, Delete } =
	firebase;

// Define the type for your shop item data
interface FormValue {
  id: string;
  image: string;
  image2: string;
  title: string;
  price: string;
  condition: string;
  status: string;
  features: string;
  tag:string;
}

interface ShopItemsProps {
  shopId: string;
  value: any;
  tag: any;
}

const ShopItemsComponent: React.FC<ShopItemsProps> = ({ shopId, value,tag }) => {
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
	} = useForm<FormValue>({
		defaultValues: {
			title: "",
		},
		shouldUseNativeValidation: true,
		mode: "onChange",
	});

  const [shopItemDetails, setShopItemDetails] = useState<FormValue[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [show, setShow] = useState<string | null>(null);

  useEffect(() => {
    const fetchShopItems = async () => {
      setIsLoading(true);
      try {
        const shopItemDetailRef = collection(database, 'Shop');
        const shopItemQuery = query(shopItemDetailRef, where('shopId', '==', shopId));
        const querySnapshot = await getDocs(shopItemQuery);

        if (querySnapshot.empty) {
          console.log('No profile details found');
          setShopItemDetails([]);
        } else {
          const retrievedData: FormValue[] = [];
          querySnapshot.forEach((doc) => {
            const docData = doc.data() as FormValue;
            retrievedData.push(docData);
            // retrievedData.push({ ...docData, id: doc.id });
          });
          setShopItemDetails(retrievedData);
        }
      } catch (error) {
        console.error('Error getting profile detail:', error);
        setShopItemDetails([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchShopItems();
  }, [shopId]);

  if (isLoading) return <div>Loading...</div>; // Handle loading state

  const filteredShopItemsTag = shopItemDetails?.filter((eachItem) => {
		const text = eachItem.tag.toLowerCase();
		return text.includes(tag.toLowerCase());
	});

	const filteredShopItemsName = filteredShopItemsTag.filter((eachItem) => {
		const text = eachItem.title.toLowerCase();
		return text.includes(value.toLowerCase());
	});

  return (
    <div className={styles.displayShopItems}>
      {shopItemDetails.length > 0 ? (
        filteredShopItemsName.map((item) => (
          <div className={styles.renderCover} key={item.id}>
            <div className={styles.shopItemsCover}>
              <div className={styles.shopsItemsImgCover}>
                <Image
                  className={styles.shopItemImg}
                  src={item.image}
                  alt={item.title}
                  quality={100}
                  width={500}
                  height={500}
                />
              </div>
              <div className={styles.shopItemsDetailCover}>
                <div className={styles.shopItemsDetailTitleName}>{item.title}</div>
                <div className={styles.shopItemsBody}>{item.price}</div>
              </div>
            </div>
            {show === item.id && (
              <div className={styles.showMoreDetails}>
                <div className={styles.shopsItemsImgCover}>
                  <Image
                    className={styles.shopItemImg}
                    src={item.image2}
                    alt={item.title}
                    quality={100}
                    width={500}
                    height={500}
                  />
                </div>
                <div className={styles.showMoreDetailCover}>
                  <div className={styles.showMoreItemsDetailsBody}>
                    <span className={styles.shopItemsDetailTitle}>Condition</span>
                    <span className={styles.shopItemsBody}>{item.condition}</span>
                  </div>
                  <div  className={styles.showMoreItemsDetailsBody}>
                    <span className={styles.shopItemsDetailTitle}>Status</span>
                    <span className={styles.shopItemsBody}>{item.status}</span>
                  </div>
                  <div  className={styles.showMoreItemsDetailsBody}>
                    <span className={styles.shopItemsDetailTitle}>Feature</span>
                    <span className={styles.shopItemsBody}>{item.features}</span>
                  </div>
                </div>
              </div>
            )}
            <div
              className={show !== item.id ? styles.btn : styles.btnA}
              onClick={() => setShow(show !== item.id ? item.id : null)}
            >
              {show === item.id ? 'Less' : 'Details'}
            </div>
          </div>
        ))
      ) : (
        <div>No items found</div> // Handle empty state
      )}
    </div>
  );
};


ShopItemsComponent.displayName = "ShopItemsComponent";

export default ShopItemsComponent;
