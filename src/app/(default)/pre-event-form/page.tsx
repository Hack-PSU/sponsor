"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ClipboardCheck, Send, AlertCircle } from "lucide-react";
import { toast } from "sonner";

interface FormData {
	name: string;
	email: string;
	organization: string;
	shirtSize: string;
	dietaryRestrictions: string;
	accommodations: string;
	questions: string;
	honeypot: string;
}

export default function PreEventFormPage() {
	const [formData, setFormData] = useState<FormData>({
		name: "",
		email: "",
		organization: "",
		shirtSize: "",
		dietaryRestrictions: "",
		accommodations: "",
		questions: "",
		honeypot: "",
	});

	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitted, setSubmitted] = useState(false);

	const handleInputChange = (field: keyof FormData, value: string) => {
		setFormData((prev) => ({
			...prev,
			[field]: value,
		}));
	};

	const validateForm = (): boolean => {
		const requiredFields = ["name", "email", "organization", "shirtSize"];
		const missingFields = requiredFields.filter(
			(field) => !formData[field as keyof FormData]
		);

		if (missingFields.length > 0) {
			toast.error(
				`Please fill in all required fields: ${missingFields.join(", ")}`
			);
			return false;
		}

		// Basic email validation
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(formData.email)) {
			toast.error("Please enter a valid email address");
			return false;
		}

		return true;
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!validateForm()) return;

		setIsSubmitting(true);

		try {
			const response = await fetch("/saveRecord", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					name: formData.name,
					email: formData.email,
					organization: formData.organization,
					shirtSize: formData.shirtSize,
					dietaryRestrictions: formData.dietaryRestrictions || "None",
					accommodations: formData.accommodations || "None",
					questions: formData.questions || "None",
					honeypot: formData.honeypot,
					formType: "pre-event-sponsor",
				}),
			});

			if (response.ok) {
				toast.success("Form submitted successfully! We'll be in touch soon.");
				setSubmitted(true);
			} else {
				throw new Error("Failed to submit form");
			}
		} catch (error) {
			console.error("Error submitting form:", error);
			toast.error(
				"Failed to submit form. Please try again or contact us directly."
			);
		} finally {
			setIsSubmitting(false);
		}
	};

	if (submitted) {
		return (
			<div className="container mx-auto px-4 py-8 max-w-2xl">
				<Card className="text-center">
					<CardContent className="p-8">
						<div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
							<ClipboardCheck className="h-8 w-8 text-green-600 dark:text-green-400" />
						</div>
						<h1 className="text-2xl font-bold text-accent mb-4">Thank You!</h1>
						<p className="text-muted-foreground mb-6">
							Your pre-event form has been submitted successfully. We'll review
							your information and get back to you if needed.
						</p>
						<p className="text-sm text-muted-foreground">
							See you at HackPSU Spring 2025! 🚀
						</p>
					</CardContent>
				</Card>
			</div>
		);
	}

	return (
		<div className="container mx-auto px-4 py-8 max-w-2xl">
			{/* Header */}
			<div className="mb-8">
				<h1 className="text-3xl md:text-4xl font-bold text-accent mb-4">
					Pre-Event Form
				</h1>
				<div className="flex items-center gap-4 mb-4">
					<Badge variant="secondary" className="text-lg px-3 py-1">
						HackPSU Spring 2025
					</Badge>
				</div>
				<p className="text-muted-foreground leading-relaxed">
					This form details some logistics for our upcoming hackathon. This form
					is for representatives only. Thank you so much for sponsoring, and
					please fill this form out ASAP!
				</p>
			</div>

			{/* Form */}
			<Card>
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						<ClipboardCheck className="h-5 w-5" />
						Sponsor Information
					</CardTitle>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit} className="space-y-6">
						{/* Name */}
						<div className="space-y-2">
							<Label htmlFor="name">
								Name <span className="text-red-500">*</span>
							</Label>
							<Input
								id="name"
								type="text"
								placeholder="Enter your full name"
								value={formData.name}
								onChange={(e) => handleInputChange("name", e.target.value)}
								required
							/>
						</div>

						{/* Email */}
						<div className="space-y-2">
							<Label htmlFor="email">
								Preferred Email <span className="text-red-500">*</span>
							</Label>
							<Input
								id="email"
								type="email"
								placeholder="Enter your preferred email address"
								value={formData.email}
								onChange={(e) => handleInputChange("email", e.target.value)}
								required
							/>
						</div>

						{/* Organization */}
						<div className="space-y-2">
							<Label htmlFor="organization">
								Which organization/company are you representing?{" "}
								<span className="text-red-500">*</span>
							</Label>
							<Input
								id="organization"
								type="text"
								placeholder="Enter your organization name"
								value={formData.organization}
								onChange={(e) =>
									handleInputChange("organization", e.target.value)
								}
								required
							/>
						</div>

						{/* Shirt Size */}
						<div className="space-y-2">
							<Label htmlFor="shirtSize">
								Shirt Size (unisex sizing){" "}
								<span className="text-red-500">*</span>
							</Label>
							<Select
								value={formData.shirtSize}
								onValueChange={(value) => handleInputChange("shirtSize", value)}
								required
							>
								<SelectTrigger>
									<SelectValue placeholder="Select your shirt size" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="XS">XS</SelectItem>
									<SelectItem value="S">S</SelectItem>
									<SelectItem value="M">M</SelectItem>
									<SelectItem value="L">L</SelectItem>
									<SelectItem value="XL">XL</SelectItem>
									<SelectItem value="XXL">XXL</SelectItem>
								</SelectContent>
							</Select>
						</div>

						{/* Dietary Restrictions */}
						<div className="space-y-2">
							<Label htmlFor="dietaryRestrictions">
								Do you have any dietary restriction(s)? (If yes, what?){" "}
								<span className="text-red-500">*</span>
							</Label>
							<Textarea
								id="dietaryRestrictions"
								placeholder="Please list any dietary restrictions or allergies, or type 'None' if you don't have any"
								value={formData.dietaryRestrictions}
								onChange={(e) =>
									handleInputChange("dietaryRestrictions", e.target.value)
								}
								rows={3}
								required
							/>
						</div>

						{/* Accommodations */}
						<div className="space-y-2">
							<Label htmlFor="accommodations">
								Any disabilities / accommodations?{" "}
								<span className="text-red-500">*</span>
							</Label>
							<Textarea
								id="accommodations"
								placeholder="Please describe any accommodations you need, or type 'None' if you don't need any"
								value={formData.accommodations}
								onChange={(e) =>
									handleInputChange("accommodations", e.target.value)
								}
								rows={3}
								required
							/>
						</div>

						{/* Questions/Comments */}
						<div className="space-y-2">
							<Label htmlFor="questions">Any questions/comments?</Label>
							<Textarea
								id="questions"
								placeholder="Feel free to share any questions, comments, or additional information"
								value={formData.questions}
								onChange={(e) => handleInputChange("questions", e.target.value)}
								rows={4}
							/>
						</div>

						{/* Required Fields Notice */}
						<div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
							<div className="flex items-start gap-2">
								<AlertCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
								<div>
									<p className="text-sm font-medium text-blue-800 dark:text-blue-200">
										Required Fields
									</p>
									<p className="text-sm text-blue-700 dark:text-blue-300">
										Fields marked with <span className="text-red-500">*</span>{" "}
										are required to submit the form.
									</p>
								</div>
							</div>
						</div>

						{/* Honeypot field for spam prevention */}
						<input
							type="text"
							name="honeypot"
							className="sr-only"
							aria-hidden="true"
							tabIndex={-1}
							value={formData.honeypot}
							onChange={(e) => handleInputChange("honeypot", e.target.value)}
						/>

						{/* Submit Button */}
						<Button
							type="submit"
							size="lg"
							disabled={isSubmitting}
							className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
						>
							{isSubmitting ? (
								<>
									<div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
									Submitting...
								</>
							) : (
								<>
									<Send className="mr-2 h-4 w-4" />
									Submit Form
								</>
							)}
						</Button>
					</form>
				</CardContent>
			</Card>

			{/* Footer Message */}
			<div className="mt-8 text-center p-6 bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg">
				<p className="text-lg font-medium text-accent">
					Thank you so much for sponsoring HackPSU!
				</p>
				<p className="text-muted-foreground mt-2">
					We can't wait to see you at the event! 🎉
				</p>
			</div>
		</div>
	);
}
