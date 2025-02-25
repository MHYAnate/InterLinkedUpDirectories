"use client";
import React from "react";
import { Services } from "@/database/data";
import { Suspense } from "react";
import Loading from "../register/logo";
import RegisterPage from "@/components/auth/signUp";

Services;

export default function Register() {

	return (
		<Suspense fallback={<Loading />}>
			<RegisterPage/>
		</Suspense>
	);
}
