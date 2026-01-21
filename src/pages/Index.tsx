"use client";

import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb, CheckCircle2, Edit, BrainCircuit } from "lucide-react";
import { Footer } from "@/components/Footer"; // Using the new Footer component

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-between bg-gradient-to-br from-blue-50 to-indigo-100 text-gray-900">
      {/* Hero Section */}
      <section className="relative w-full py-20 md:py-32 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-700 opacity-90 rounded-b-[50px] md:rounded-b-[100px] shadow-xl"></div>
        <div className="relative z-10 container mx-auto px-6">
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight drop-shadow-lg animate-fade-in-up">
            Organize Your Life, Smarter.
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-10 max-w-3xl mx-auto drop-shadow-md animate-fade-in-up delay-200">
            Your ultimate task manager with intelligent suggestions and a beautiful, intuitive interface.
          </p>
          <Link to="/tasks">
            <Button className="px-10 py-6 text-xl font-bold bg-white text-blue-700 hover:bg-blue-50 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-105 animate-fade-in-up delay-400">
              Get Started Now
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-16 md:py-24 bg-white rounded-t-[50px] md:rounded-t-[100px] -mt-12 md:-mt-24 relative z-20 shadow-inner">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-blue-800 mb-12 drop-shadow-sm">
            Features That Empower You
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-blue-200">
              <CardHeader className="flex flex-col items-center text-center p-6">
                <div className="p-4 bg-blue-200 rounded-full mb-4">
                  <BrainCircuit className="h-10 w-10 text-blue-700" />
                </div>
                <CardTitle className="text-2xl font-bold text-blue-800 mb-2">AI Suggestions</CardTitle>
              </CardHeader>
              <CardContent className="p-6 pt-0">
                <CardDescription className="text-gray-700 text-base">
                  Get smart category suggestions as you type, making organization effortless.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-blue-200">
              <CardHeader className="flex flex-col items-center text-center p-6">
                <div className="p-4 bg-green-200 rounded-full mb-4">
                  <CheckCircle2 className="h-10 w-10 text-green-700" />
                </div>
                <CardTitle className="text-2xl font-bold text-blue-800 mb-2">Intuitive Management</CardTitle>
              </CardHeader>
              <CardContent className="p-6 pt-0">
                <CardDescription className="text-gray-700 text-base">
                  Easily add, complete, edit, and delete tasks with a clean and responsive interface.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-blue-200">
              <CardHeader className="flex flex-col items-center text-center p-6">
                <div className="p-4 bg-purple-200 rounded-full mb-4">
                  <Edit className="h-10 w-10 text-purple-700" />
                </div>
                <CardTitle className="text-2xl font-bold text-blue-800 mb-2">Quick Editing</CardTitle>
              </CardHeader>
              <CardContent className="p-6 pt-0">
                <CardDescription className="text-gray-700 text-base">
                  Double-click to edit tasks directly in the list for rapid updates.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-blue-200">
              <CardHeader className="flex flex-col items-center text-center p-6">
                <div className="p-4 bg-yellow-200 rounded-full mb-4">
                  <Lightbulb className="h-10 w-10 text-yellow-700" />
                </div>
                <CardTitle className="text-2xl font-bold text-blue-800 mb-2">Filter & Focus</CardTitle>
              </CardHeader>
              <CardContent className="p-6 pt-0">
                <CardDescription className="text-gray-700 text-base">
                  Filter tasks by all, active, or completed to maintain focus on what matters.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;