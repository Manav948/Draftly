"use client"

import React, { useCallback, useEffect } from 'react'
import { Edge } from "reactflow"
import { edgeOptionSchema, EdgeOptionSchema } from '@/schema/edgeOptionsSchema'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import {
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle
} from '../ui/sheet'

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '../ui/form'

import { Input } from '../ui/input'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '../ui/select'
import { Checkbox } from '../ui/checkbox'
import { Button } from '../ui/button'
import { EdgeColors } from '@/types/enum'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { cn } from '@/lib/utils'
import { ScrollArea } from '../ui/scroll-area'

interface Props {
    clickedEdge: Edge | null
    isOpen: boolean
    onSave: (data: EdgeOptionSchema) => void
    onDeleteEdge: (edgeId: string) => void
}

const color: EdgeColors[] = [
    EdgeColors.BLUE,
    EdgeColors.CYAN,
    EdgeColors.DEFAULT,
    EdgeColors.FUCHSIA,
    EdgeColors.GREEN,
    EdgeColors.INDIGO,
    EdgeColors.LIME,
    EdgeColors.ORANGE,
    EdgeColors.PINK,
    EdgeColors.PURPLE,
    EdgeColors.RED,
    EdgeColors.YELLOW,
]

const EdgeOptions = ({
    clickedEdge,
    isOpen,
    onDeleteEdge,
    onSave
}: Props) => {

    const form = useForm<EdgeOptionSchema>({
        resolver: zodResolver(edgeOptionSchema),
        defaultValues: {
            edgeId: "",
            label: "",
            type: "customBeziar",
            animate: false,
            color: EdgeColors.DEFAULT
        }
    })

    useEffect(() => {
        if (isOpen && clickedEdge) {
            form.reset({
                edgeId: clickedEdge.id,
                label: clickedEdge.data?.label ?? "",
                animate: clickedEdge.animated ?? false,
                type: (clickedEdge.type as
                    | "customBeziar"
                    | "customStepRounded"
                    | "customStepSharp"
                    | "customStraight") ?? "customBeziar",
                color: clickedEdge.data?.color ?? EdgeColors.DEFAULT,
            });
        }
    }, [isOpen, clickedEdge, form]);


    const workspaceColor = useCallback((providedColor: EdgeColors) => {
        switch (providedColor) {

            case EdgeColors.PURPLE:
                return "!bg-purple-600 hover:bg-pruple-500 text-white"
            case EdgeColors.BLUE:
                return "!bg-blue-600 hover:bg-blue-500 text-white"
            case EdgeColors.CYAN:
                return "!bg-cyan-600 hover:bg-cyan-500 text-white"
            case EdgeColors.FUCHSIA:
                return "!bg-fuchsia-600 hover:bg-fuchsia-500 text-white"
            case EdgeColors.GREEN:
                return "!bg-green-600 hover:bg-green-500 text-white"
            case EdgeColors.INDIGO:
                return "!bg-indigo-600 hover:bg-indigo-500 text-white"
            case EdgeColors.LIME:
                return "!bg-lime-600 hover:bg-lime-500 text-white"
            case EdgeColors.ORANGE:
                return "!bg-orange-600 hover:bg-orange-500 text-white"
            case EdgeColors.PINK:
                return "!bg-pink-600 hover:bg-pink-500 text-white"
            case EdgeColors.RED:
                return "!bg-red-600 hover:bg-red-500 text-white"
            case EdgeColors.YELLOW:
                return "!bg-yellow-600 hover:bg-yellow-500 text-white"
            default:
                return "!bg-secondary hover:bg-secondary-500"
        }
    }, [])

    const onSubmit = (data: EdgeOptionSchema) => {
        onSave(data)
    }

    return (
        <SheetContent
            side="right"
            className="
        w-full 
        sm:max-w-[400px]
        md:max-w-[440px]
        p-0 
        flex 
        flex-col
        dark:bg-[#0e0707]
      "
        >
            <ScrollArea className='h-full p-6'>

                {/* HEADER */}
                <SheetHeader className="px-6 pt-6 pb-4 border-b">
                    <SheetTitle className="text-xl">
                        Edge Settings
                    </SheetTitle>

                    <SheetDescription className="text-sm">
                        Configure your connection style, label, and animation options.
                    </SheetDescription>
                </SheetHeader>


                {/* FORM BODY */}
                <div className="flex-1 overflow-y-auto px-6 py-5">

                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-6"
                        >

                            {/* LABEL INPUT */}
                            <FormField
                                control={form.control}
                                name="label"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Label</FormLabel>

                                        <FormControl>
                                            <Input
                                                placeholder="Enter edge label..."
                                                className="bg-muted"
                                                {...field}
                                            />
                                        </FormControl>

                                        <FormDescription>
                                            This text is displayed on the edge.
                                        </FormDescription>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />


                            {/* EDGE TYPE */}
                            <FormField
                                control={form.control}
                                name="type"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Edge Style</FormLabel>

                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Choose style" />
                                                </SelectTrigger>
                                            </FormControl>

                                            <SelectContent>
                                                <SelectItem value='customBeziar'>
                                                    Bezier (Smooth Curve)
                                                </SelectItem>

                                                <SelectItem value='customStraight'>
                                                    Straight Line
                                                </SelectItem>

                                                <SelectItem value='customStepSharp'>
                                                    Step Sharp
                                                </SelectItem>

                                                <SelectItem value='customStepRounded'>
                                                    Step Rounded
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="space-y-1.5">
                                <FormField
                                    control={form.control}
                                    name="color"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-sm font-medium">Colors</FormLabel>
                                            <FormControl>
                                                <RadioGroup
                                                    value={field.value}
                                                    onValueChange={field.onChange}
                                                    className="grid grid-cols-10 grid-rows-2">
                                                    {color.map((color) => (
                                                        <FormItem
                                                            key={color}
                                                            className="flex items-center space-x-3 space-y-0">
                                                            <FormControl>
                                                                <RadioGroupItem
                                                                    value={color}
                                                                    className={cn(`transition-colors duration-200 ${workspaceColor(color)}`)}
                                                                ></RadioGroupItem>
                                                            </FormControl>
                                                        </FormItem>
                                                    ))}
                                                </RadioGroup>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            {/* ANIMATE */}
                            <FormField
                                control={form.control}
                                name="animate"
                                render={({ field }) => (
                                    <FormItem className="flex items-center gap-3">

                                        <FormControl>
                                            <Checkbox
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>

                                        <div className="space-y-1 leading-none">
                                            <FormLabel className="cursor-pointer">
                                                Animated Edge
                                            </FormLabel>

                                            <FormDescription>
                                                Enable flowing animation on the edge
                                            </FormDescription>
                                        </div>

                                    </FormItem>
                                )}
                            />

                            {/* SPACER */}
                            <div className="h-4" />

                            {/* ACTION BUTTONS */}
                            <div className="space-y-3">

                                <Button
                                    type="submit"
                                    className="w-full"
                                >
                                    Save Changes
                                </Button>

                                <Button
                                    type="button"
                                    variant="destructive"
                                    className="w-full"
                                    onClick={() =>
                                        onDeleteEdge(form.getValues("edgeId"))
                                    }
                                >
                                    Delete Edge
                                </Button>

                            </div>

                        </form>
                    </Form>

                </div>
            </ScrollArea>
        </SheetContent>
    )
}

export default EdgeOptions
