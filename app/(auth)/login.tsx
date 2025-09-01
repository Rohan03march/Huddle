import { COLORS } from "@/constants/theme";
import { useSSO } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { styles } from "../../styles/auth.styles";

export default function Login() {
  const { startSSOFlow } = useSSO();
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    try {
      const { createdSessionId, setActive } = await startSSOFlow({
        strategy: "oauth_google",
      });

      if (setActive && createdSessionId) {
        setActive({ session: createdSessionId });
        router.replace("/(tabs)");
      }
    } catch (error) {
      console.error("OAuth error:", error);
    }
  };
  return (
    <View style={styles.container}>
      {/** BRAND SECTION */}
      <View style={styles.brandSection}>
        <View style={styles.loginSection}>
          <Ionicons name="leaf" size={32} color={COLORS.primary} />
        </View>
        <Text style={styles.appName}>Huddle</Text>
        <Text style={styles.tagline}>Don&apos;t Miss anything</Text>
      </View>

      {/** Illustration Image */}
      <View style={styles.illustrationContainer}>
        <Image
          source={require("../../assets/images/Online wishes-bro.png")}
          style={styles.illustration}
          resizeMode="cover"
        />
      </View>

      {/**Login Section */}
      <View style={styles.loginSection}>
        <TouchableOpacity
          style={styles.googleButton}
          onPress={handleGoogleSignIn}
          activeOpacity={0.9}
        >
          <View style={styles.googleIconContainer}>
            <Ionicons name="logo-google" size={20} color={COLORS.surface} />
          </View>
          <Text style={styles.googleButtonText}>Continue With Google</Text>
        </TouchableOpacity>
        <Text style={styles.termsText}>
          By continuing, you agree to our terms and Privacy policy
        </Text>
      </View>
    </View>
  );
}
